# local-api-gateway

Make API gateway which can handle localhost going offline by using RabbitMQ queue:

- `local` runs on the host which makes API calls
- `remote` is running on the API server

RabbitMQ Shovel forwards requests from `local` to `remote` RabbitMQ.
