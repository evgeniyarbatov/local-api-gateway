resource "aws_instance" "api-server" {
  ami                    = data.aws_ami.linux.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.api-server-sec-gr.id]

  provisioner "file" {
    source      = "../docker-compose.yaml"
    destination = "/app"
  }

  provisioner "remote-exec" {
    inline = [
      "cd /app",
      "docker-compose up",
    ]
  }

  user_data = templatefile(
    "init-script.tftpl",
    {
      compose = file("${path.module}/../docker-compose.yaml")
      env = file("${path.module}/../.env")
    }
  )

  tags = {
    Name = "Docker host"
  }
}