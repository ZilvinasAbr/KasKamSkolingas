const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const auth = require('./auth')();
const cfg = require('./config');
const { MongoClient } = require('mongodb');
const { findUsers, authorize } = require('./mongodbMethods/user');
const apiRoutes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(auth.initialize());
apiRoutes(app);

app.get('/user', auth.authenticate(), async (req, res) => {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    const users = await findUsers(req.user.userName, db);
    res.json(users[0]);
    db.close();
  } catch (err) {
    const errorMessage = 'Could not connect to MongoDb on GET \'/user\'';
    console.error(errorMessage);
    res.sendStatus(500);
  }
});

app.post('/token', async (req, res) => {
  if (req.body.userName && req.body.password) {
    const userName = req.body.userName;
    const password = req.body.password;

    let isAuthorized = false;

    try {
      const db = await MongoClient.connect(cfg.dbConnectionUrl);
      isAuthorized = await authorize(userName, password, db);
      db.close();
    } catch (err) {
      console.log('line 42 index.js');
      console.error(err);
    }

    if (isAuthorized) {
      const payload = {
        userName
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
