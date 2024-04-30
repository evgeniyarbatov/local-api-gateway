# Local API Gateway

This is the source of the API calls. Local ExpressJS server to add API calls to RabbitMQ queue. The parameters are:

- `api` is the name of the remote API to call
- `params` are the params to pass to the remote API

Example:

```
curl --location 'localhost:8080/api' \
--header 'Content-Type: application/json' \
--data '{
    "api": "log",
    "params": {
        "x": 2,
        "y": 3
    }
}'
```

## Run

```
docker compose up
```

## RabbitMQ

Enable shovel:

```
docker exec -it rabbitmq-local rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management
```

Configure shovel:

```
docker exec -it rabbitmq-local \
rabbitmqctl set_parameter shovel log-shovel \
'{
  "src-protocol": "amqp091",
  "src-uri": "amqp://",
  "src-queue": "log",
  "dest-protocol": "amqp091",
  "dest-uri": "amqp://47.128.145.103",
  "dest-queue": "log",
  "dest-queue-args": {
    "x-queue-type": "quorum"
  }
}'
```

## Update gateway code

```
docker compose rm -f gateway
docker compose pull gateway
```