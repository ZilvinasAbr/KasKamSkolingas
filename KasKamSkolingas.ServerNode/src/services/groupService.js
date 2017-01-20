const { MongoClient } = require('mongodb');

const cfg = require('../config');

async function createGroup(userName, groupName) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    const groupFound = await db.collection('groups').findOne({ name: groupName });

    if (groupFound) {
      return Promise.resolve(false);
    }

    const newGroup = {
      name: groupName
    };

    const newUserGroup = {
      userName,
      groupName
    };

    const result1 = db.collection('groups').insertOne(newGroup);
    const result2 = db.collection('userGroups').insertOne(newUserGroup);

    await Promise.all([result1, result2]);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(true);
}

async function addUserToGroup(userName, groupName, userNameToAdd) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    const userToAddFoundPromise = db.collection('users').findOne({ userName: userNameToAdd });
    const groupFoundPromise = db.collection('groups').findOne({ name: groupName });
    const userGroup1FoundPromise = db.collection('userGroups').findOne({ userName, groupName });
    const userGroup2FoundPromise = db.collection('userGroups').findOne({ userName: userNameToAdd, groupName });

    const userToAddFound = await userToAddFoundPromise;
    const groupFound = await groupFoundPromise;
    const userGroup1Found = await userGroup1FoundPromise;
    const userGroup2Found = await userGroup2FoundPromise;

    if (!userToAddFound || !groupFound || !userGroup1Found || userGroup2Found) {
      return Promise.resolve(false);
    }

    const newUserGroup = {
      userName: userNameToAdd,
      groupName
    };

    await db.collection('userGroups').insertOne(newUserGroup);

    db.close();
    return Promise.resolve(true);
  } catch (err) {
    console.error(err);
    return Promise.resolve(false);
  }
}

async function leaveGroup(userName, groupName) {
  const db = await MongoClient.connect(cfg.dbConnectionUrl);

  let userFound = db.collection('users')
    .findOne({ userName });
  let groupFound = db.collection('groups')
    .findOne({ name: groupName });
  let userGroupFound = db.collection('userGroups')
    .findOne({ userName, groupName });
  let userGroupDebtFound = db.collection('debts')
    .findOne({});

  userFound = await userFound;
  groupFound = await groupFound;
  userGroupFound = await userGroupFound;
  userGroupDebtFound = await userGroupDebtFound;

  if (!userFound || !groupFound || !userGroupFound || userGroupDebtFound) {
    return Promise.resolve(false);
  }

  await db.collection('userGroups').remove({ userName, groupName });

  return Promise.resolve(true);
}

async function getGroupData(userName, groupName) {
  throw 'NotImplemented';
}

module.exports = {
  createGroup,
  addUserToGroup,
  leaveGroup,
  getGroupData
};
