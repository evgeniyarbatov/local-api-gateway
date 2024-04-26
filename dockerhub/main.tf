resource "null_resource" "push" {
  provisioner "local-exec" {
    command     = "${path.module}/push.sh ${var.source_path} ${var.base_repository_url}/${var.image_name} ${var.tag}"
    interpreter = ["bash", "-c"]
  }
  triggers = {
    always_run = "${timestamp()}"
  }
}