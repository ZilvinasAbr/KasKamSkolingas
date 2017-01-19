const bcrypt = require('bcrypt-nodejs');

async function findUsers(userName, db) {
  const collection = db.collection('users');
  return collection.find({ userName }).toArray();
}

async function insertUser(user, db) {
  const collection = db.collection('users');
  return collection.insertOne(user);
}

async function authorize(userName, password, db) {
  const users = await findUsers(userName, db);
  const user = users[0];

  if (user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  return Promise.resolve(false);
}

module.exports = {
  findUsers,
  insertUser,
  authorize
};
