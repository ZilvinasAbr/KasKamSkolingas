const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt-nodejs');

const { dbConnectionUrl } = require('../config');

const router = express.Router();

function findUsers(clause, db, callback) {
  const collection = db.collection('users');
  collection
    .find(clause)
    .toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
}

function insertUser(user, db, callback) {
  const collection = db.collection('users');
  collection.insertOne(user)
    .then(result => callback(result, null))
    .catch(err => callback(null, err));
}

router.post('/register', (req, res) => {
  MongoClient.connect(dbConnectionUrl, (err, db) => {
    assert.equal(null, err);

    const { userName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.send(false);
      db.close();
      return;
    }

    findUsers({ userName }, db, (docs) => {
      if (docs.length > 0) {
        res.send(false);
        db.close();
      }

      const encryptedPassword = bcrypt.hashSync(password);
      const user = {
        userName,
        password: encryptedPassword
      };

      insertUser(user, db, (result, err2) => {
        assert.equal(err2, null);

        res.send(true);
        db.close();
      });
    });
  });
});

module.exports = router;
