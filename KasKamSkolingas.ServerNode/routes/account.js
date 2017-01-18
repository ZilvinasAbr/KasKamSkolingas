const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt-nodejs');

const { dbConnectionUrl } = require('../config');

const router = express.Router();

router.post('/register', (req, res) => {
  MongoClient.connect(dbConnectionUrl, (err, db) => {
    assert.equal(null, err);

    const { userName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.send(false);
      db.close();
      return;
    }

    const encryptedPassword = bcrypt.hashSync(password);

    db.collection('users').insertOne({
      userName,
      password: encryptedPassword
    })
    .then((result) => {
      console.log('Inserted user into users collection');
      db.close();
      res.send(true);
    })
    .catch(err2 => console.error(err2));
  });
});

module.exports = router;
