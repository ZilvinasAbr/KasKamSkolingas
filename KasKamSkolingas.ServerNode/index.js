const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    status: 'My API is alive!',
  });
});

app.listen(3000, () => {
  console.log('My API is running...');
});

module.exports = app;
