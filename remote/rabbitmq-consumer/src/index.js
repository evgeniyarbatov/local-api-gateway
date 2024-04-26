require('dotenv').config();

const amqp = require('amqplib/callback_api');

const apis = [
  'purchase', 
  'log',
];

async function startConsumers(apis) {
  try {
      const amqpUrl = process.env.AMQP_URL || 'amqp://localhost'
      const connection = await amqp.connect(amqpUrl);
      const channel = await connection.createChannel();

      for (const api of apis) {
          await channel.assertQueue(api, { durable: true });
          console.log(`Waiting for messages in ${api} queue.`);

          channel.consume(api, (msg) => {
            console.log(`Received from ${api}:`, msg.content.toString());
          }, {
              noAck: true
          });
      }
  } catch (error) {
      console.error("Failed to connect or consume:", error);
      process.exit(1);
  }
}

startConsumers(apis);