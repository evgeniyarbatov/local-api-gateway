require('dotenv').config();

const axios = require('axios');
const amqp = require('amqplib/callback_api');

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost'
const serverUrl = process.env.SERVER_URL || 'http://localhost:9090'
const queueName = process.env.QUEUE_NAME || 'api'

amqp.connect(amqpUrl, function(error0, connection) {
    if (error0) {
        console.log("Failed to connect to %s. Error: %s", amqpUrl, error0);
        throw error0;
    }
    console.log("Connected to %s", amqpUrl);

    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log("Failed to create channel to %s. Error: %s", channel, error1);
            throw error1;
        }

        channel.assertQueue(
            queueName, 
            { durable: false }
        );

        console.log("Waiting for messages in %s.", api);

        channel.consume(queueName, function(msg) {
            const data = JSON.parse(msg.content.toString());
            console.log("%s received %s", queueName, data);

            const url = serverUrl + '/' + data['api'];
            axios.post(url, data['params'])
                .then(response => {
                    console.log('Success', url, response.data);
                })
                .catch(error => {
                    console.error('Error', url, error);
                });
            }, 
            {
                noAck: true
            }
        );
    });
});
