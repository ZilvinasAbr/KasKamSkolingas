const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const { jwtSecret } = require('../config');

async function register(userName, password, db) {
  const userFound = await db.collection('users')
    .findOne({ userName });

  if (userFound) {
    return Promise.resolve(false);
  }

  const encryptedPassword = bcrypt.hashSync(password);
  const newUser = {
    userName,
    password: encryptedPassword
  };

  await db.collection('users').insertOne(newUser);

  const payload = {
    userName
  };

  const token = jwt.encode(payload, jwtSecret);
  return Promise.resolve(token);
}

async function passwordSignIn(userName, password, db) {
  const usersFound = await db.collection('users')
    .find({ userName })
    .toArray();

  const userFound = usersFound[0];

  if (!userFound) {
    return Promise.resolve(null);
  }

  const matches = bcrypt.compareSync(password, userFound.password);

  if (!matches) {
    return Promise.resolve(null);
  }

  const payload = {
    userName
  };

  const token = jwt.encode(payload, jwtSecret);

  return Promise.resolve(token);
}

module.exports = {
  register,
  passwordSignIn
};
