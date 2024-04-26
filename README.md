# local-api-gateway

Make API gateway which can handle localhost going offline

## Run

Start:

```
docker compose up
```

## Debugging

List queues:

```
docker exec -it rabbitmq rabbitmqctl list_queues
```

Update gateway code:

```
docker compose rm -f gateway
docker compose pull gateway
```
