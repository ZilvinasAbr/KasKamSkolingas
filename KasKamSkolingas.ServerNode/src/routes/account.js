const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt-nodejs');

const { dbConnectionUrl } = require('../config');

const router = express.Router();

async function findUsers(userName, db) {
  const collection = db.collection('users');
  return collection.find({ userName }).toArray();
}

async function insertUser(user, db) {
  const collection = db.collection('users');
  return collection.insertOne(user);
}

router.post('/register', async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.send(false);
    return;
  }

  try {
    const db = await MongoClient.connect(dbConnectionUrl);

    const usersFound = await findUsers(userName, db);

    if (usersFound.length > 0) {
      res.send(false);
      db.close();
      return;
    }

    const encryptedPassword = bcrypt.hashSync(password);
    const newUser = {
      userName,
      password: encryptedPassword
    };

    await insertUser(newUser, db);
    res.send(true);
    db.close();
  } catch (error) {
    res.send(false);
  }
});

module.exports = router;
