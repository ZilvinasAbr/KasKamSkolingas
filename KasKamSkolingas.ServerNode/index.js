const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const auth = require('./auth.js')();
const users = require('./users.js');
const cfg = require('./config.js');

const app = express();

app.use(bodyParser.json());
app.use(auth.initialize());

app.get('/', (req, res) => {
  res.json({
    status: 'My API is alive!',
  });
});

app.get('/user', auth.authenticate(), (req, res) => {
  res.json(users[req.user.id]);
});

app.post('/token', (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(u =>
      u.email === email && u.password === password);
    if (user) {
      const payload = {
        id: user.id
      };
      const token = jwt.encode(payload, cfg.jwtSecret);
      res.json({
        token
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, () => {
  console.log('My API is running...');
});

module.exports = app;
