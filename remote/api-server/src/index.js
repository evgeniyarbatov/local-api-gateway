require('dotenv').config();

const express = require('express');

const app = express();
const port = 9090;

app.use((req, res, next) => {
  console.log(`API called: /${req.path}`);
  next();
});

app.post('/purchase', async (req, res) => {
  res.json({ 
    success: true, 
    message: 'Success'
  });
});

app.post('/log', async (req, res) => {
  res.json({ 
    success: true, 
    message: 'Success'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
