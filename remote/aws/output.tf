output "ssh" {
  value = "ssh -i ~/.ssh/terraform.pem -o 'StrictHostKeyChecking no' ubuntu@${aws_instance.api-server.public_ip}"
}

output "logs" {
  value = "ssh -i ~/.ssh/terraform.pem -o 'StrictHostKeyChecking no' ubuntu@${aws_instance.api-server.public_ip} 'tail -f /var/log/cloud-init-output.log'"
}