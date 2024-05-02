variable "aws_region" {
  default = "ap-southeast-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "rabbbitmq_port" {
  default = "5672"
}

variable "key_name" {
  default = "terraform"
}

variable "local_rabbitmq_name" {
  default = "rabbitmq-local"
}

variable "rabbitmq_queue_name" {
  default = "api"
}