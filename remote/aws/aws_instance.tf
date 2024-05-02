resource "aws_instance" "api-server" {
  ami                    = data.aws_ami.linux.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.api-server-sec-gr.id]

  user_data = templatefile(
    "init-script.tftpl",
    {
      compose = file("${path.module}/../docker-compose.yaml"),
      env     = file("${path.module}/../.env")
    }
  )

  tags = {
    Name = "Docker host"
  }
}

resource "null_resource" "rabbitmq-shovel" {
  depends_on = [
    aws_instance.api-server
  ]

  provisioner "local-exec" {
    command     = <<-EOT
      docker exec ${var.local_rabbitmq_name} rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management
      docker exec ${var.local_rabbitmq_name} \
        rabbitmqctl set_parameter shovel ${var.rabbitmq_queue_name}-shovel \
        '{
          "src-protocol": "amqp091",
          "src-uri": "amqp://",
          "src-queue": "${var.rabbitmq_queue_name}",
          "dest-protocol": "amqp091",
          "dest-uri": "amqp://${aws_instance.api-server.public_ip}",
          "dest-queue": "${var.rabbitmq_queue_name}",
          "dest-queue-args": {
            "x-queue-type": "quorum"
          }
        }'
    EOT
    interpreter = ["bash", "-c"]
  }
  triggers = {
    always_run = "${timestamp()}"
  }
}