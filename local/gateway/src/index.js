require('dotenv').config();

const express = require('express');
const amqp = require('amqplib');
const bodyParser = require('body-parser');

const port = process.env.GATEWAY_PORT || 8080;
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost'
const queueName = process.env.QUEUE_NAME || 'api'

const app = express();
app.use(bodyParser.json());

async function sendMessage(
  apiParams,
) {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(
      queueName, 
      { durable: false }
    );

    channel.sendToQueue( 
      queueName, 
      Buffer.from(JSON.stringify(apiParams))
    );

    console.log(`Queued api: ${apiParams.api} with params: ${JSON.stringify(apiParams.params)}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

app.post('/api', async (req, res) => {
  if (
    !req.body || 
    !req.body.api ||
    !req.body.params
  ) {
    return res.status(400).json({
      error: 'Required field is missing'
    });
  }

  await sendMessage(
    req.body
  );

  res.json({ 
    success: true, 
    message: 'Submitted'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
