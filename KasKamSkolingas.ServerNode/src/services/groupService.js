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

module.exports = {
  createGroup
};
