# Publish Images to Dockerhub

First time:

```
tf init
```

Gateway image:

```
tf apply \
-var 'image_name=api-gateway' \
-var 'source_path=../local/gateway' \
-auto-approve
```

RabbitMQ consumer image:

```
tf apply \
-var 'image_name=rabbitmq-consumer' \
-var 'source_path=../remote/rabbitmq-consumer' \
-auto-approve
```

API server image:

```
tf apply \
-var 'image_name=api-server' \
-var 'source_path=../remote/api-server' \
-auto-approve
```