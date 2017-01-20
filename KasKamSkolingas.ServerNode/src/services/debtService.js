const { MongoClient } = require('mongodb');

const cfg = require('../config');

async function createDebt({
  dateCreated,
  groupName,
  userNameFrom,
  userNameTo,
  amount,
  whatFor
}) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    let groupFound = db.collection('groups')
      .findOne({ name: groupName });
    let userFromFound = db.collection('users')
      .findOne({ userName: userNameFrom });
    let userToFound = db.collection('users')
      .findOne({ userName: userNameTo });
    let userGroup1Found = db.collection('userGroups')
      .findOne({ userName: userNameFrom, groupName });
    let userGroup2Found = db.collection('userGroups')
      .findOne({ userName: userNameTo, groupName });

    groupFound = await groupFound;
    userFromFound = await userFromFound;
    userToFound = await userToFound;
    userGroup1Found = await userGroup1Found;
    userGroup2Found = await userGroup2Found;

    if (
      !groupFound ||
      !userFromFound ||
      !userToFound ||
      !userGroup1Found ||
      !userGroup2Found) {
      return Promise.resolve(false);
    }

    const newDebt = {
      dateCreated,
      amount,
      whatFor,
      userNameFrom,
      userNameTo,
      groupName
    };

    await db.collection('debts').insertOne(newDebt);

    db.close();
    return Promise.resolve(true);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

module.exports = {
  createDebt
};
