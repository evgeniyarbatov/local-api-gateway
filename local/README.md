# Local API Gateway

This is the source of the API calls. Local ExpressJS server to add API calls to RabbitMQ queue. The parameters are:

- `api` is the name of the remote API to call
- `params` are the params to pass to the remote API

Example:

```
curl --location 'localhost:8080/api' \
--header 'Content-Type: application/json' \
--data '{
    "api": "another-api",
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

## List RabbitMQ queues

```
docker exec -it rabbitmq rabbitmqctl list_queues
```

## Update gateway code

```
docker compose rm -f gateway
docker compose pull gateway
```