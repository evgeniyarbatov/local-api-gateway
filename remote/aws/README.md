# API server on AWS

Simulate remote API server by hosting it on AWS.

This creates EC2 instance and runs Docker Compose.

## Run

First time:

```
tf init
```

Update:

```
tf apply -auto-approve
```

## RabbitMQ

List queues

```
sudo docker exec -it rabbitmq-remote rabbitmqctl list_queues
```