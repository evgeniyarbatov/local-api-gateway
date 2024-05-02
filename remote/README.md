# Remote API Gateway

This is the destination of the API calls. It runs RabbitMQ and ExpressJS server acting as destination API server. 

## Testing

List queues:

```
docker exec -it rabbitmq-remote rabbitmqctl list_queues
```