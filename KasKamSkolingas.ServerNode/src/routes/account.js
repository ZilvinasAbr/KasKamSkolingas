const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt-nodejs');

const { dbConnectionUrl } = require('../config');

const router = express.Router();

function findUsers(userName, db) {
  const collection = db.collection('users');
  return collection.find({ userName }).toArray();
}

function insertUser(user, db) {
  const collection = db.collection('users');
  return collection.insertOne(user);
}

router.post('/register', (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send(false);
    return;
  }

  MongoClient.connect(dbConnectionUrl)
    .then((db) => {
      findUsers(userName, db)
        .then((usersFound) => {
          if (usersFound.length > 0) {
            res.send(false);
            db.close();
            return Promise.resolve(true);
          } else {
            const encryptedPassword = bcrypt.hashSync(password);
            const newUser = {
              userName,
              password: encryptedPassword
            };

            return insertUser(newUser, db);
          }
        })
        .then(() => {
          console.log('Inserted user');
          res.send(true);
          db.close();
        })
        .catch((err) => {
          console.error(err);
          db.close();
        });
    })
    .catch(err => console.error(err));
});

module.exports = router;
