require('dotenv').config();

const amqp = require('amqplib/callback_api');

const apis = [
  'purchase', 
  'log',
];

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost'
const serverUrl = process.env.SERVER_URL || 'http://localhost:9090'

amqp.connect(amqpUrl, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        for (const api of apis) {
          channel.assertQueue(api, {
              durable: false
          });

          console.log("Waiting for messages in %s.", api);

          channel.consume(api, function(msg) {
            console.log("%s received %s", api, msg.content.toString());

            const url = serverUrl + '/' + api;
            const data = JSON.parse(msg.content.toString());

            axios.post(url, data)
              .then(response => {
                  console.log('Success', url, response.data);
              })
              .catch(error => {
                  console.error('Error during API call', error);
              });

          }, {
              noAck: true
          });
        }
    });
});
