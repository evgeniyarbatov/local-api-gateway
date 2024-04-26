require('dotenv').config();

const express = require('express');
const amqp = require('amqplib');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

async function sendMessage(
  api,
  params,
) {
  try {
    const amqpUrl = process.env.AMQP_URL 
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(api, { durable: false });
    channel.sendToQueue(api, Buffer.from(JSON.stringify(params)));

    console.log(`Queued api: ${api} params: ${JSON.stringify(params)}`);
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
    req.body.api,
    req.body.params,
  );

  res.json({ 
    success: true, 
    message: 'Submitted'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
