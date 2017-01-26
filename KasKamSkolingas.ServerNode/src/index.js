const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const auth = require('./auth')();
// const cfg = require('./config');
// const { MongoClient } = require('mongodb');
const apiRoutes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(auth.initialize());
apiRoutes(app);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// app.get('/user', auth.authenticate(), async (req, res) => {
//   try {
//     const db = await MongoClient.connect(cfg.dbConnectionUrl);

//     const userFound = await db.collection('users')
//       .findOne({ userName: req.user.userName });

//     res.json(userFound);
//     db.close();
//   } catch (err) {
//     const errorMessage = 'Could not connect to MongoDb on GET \'/user\'';
//     console.error(errorMessage);
//     res.sendStatus(500);
//   }
// });

app.listen(3000, () => {
  console.log('My API is running...');
});

module.exports = app;
