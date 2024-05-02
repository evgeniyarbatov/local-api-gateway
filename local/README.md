# Local API Gateway

Local ExpressJS server adds API calls to RabbitMQ queue. 

This is the source of the API calls. 

## Run

```
docker compose up
```

## Make API call

The parameters are:

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

## Enable RabbitMQ shovel

Enable plugin:

```
docker exec -it rabbitmq-local rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management
```

Configure shovel:

```
docker exec -it rabbitmq-local \
rabbitmqctl set_parameter shovel api-shovel \
'{
  "src-protocol": "amqp091",
  "src-uri": "amqp://",
  "src-queue": "api",
  "dest-protocol": "amqp091",
  "dest-uri": "amqp://47.128.145.103",
  "dest-queue": "api",
  "dest-queue-args": {
    "x-queue-type": "quorum"
  }
}'
```

## Debugging

List queues:

```
docker exec -it rabbitmq-local rabbitmqctl list_queues
```

Show message in the queue:

```
docker exec -it rabbitmq-local rabbitmqadmin get queue=api
```