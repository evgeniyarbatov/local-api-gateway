# local-api-gateway

Make API gateway which can handle localhost going offline

## Run

Start RabbitMQ:

```
docker compose up
```

List queues:

```
docker exec -it rabbitmq rabbitmqctl list_queues
```
