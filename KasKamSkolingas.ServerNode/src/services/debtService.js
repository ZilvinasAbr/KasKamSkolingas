const { MongoClient, ObjectID } = require('mongodb');

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
      groupName,
      isDebtPaid: false
    };

    await db.collection('debts').insertOne(newDebt);

    db.close();
    return Promise.resolve(true);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

async function deleteDebt(userName, debtId) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    let userFound = db.collection('users')
      .findOne({ userName });
    let debtFound = db.collection('debts')
      .findOne({ _id: ObjectID(debtId), userNameTo: userName });

    userFound = await userFound;
    debtFound = await debtFound;

    if (!userFound || !debtFound) {
      return Promise.resolve(false);
    }

    await db.collection('debts')
      .remove({ _id: ObjectID(debtId) });

    db.close();
    return Promise.resolve(true);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

async function endDebt(userName, debtId) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    let userFound = db.collection('users')
      .findOne({ userName });
    let debtFound = db.collection('debts')
      .findOne({ _id: ObjectID(debtId), userNameTo: userName });

    userFound = await userFound;
    debtFound = await debtFound;

    if (!userFound || !debtFound) {
      return Promise.resolve(false);
    }

    await db.collection('debts').update(
      { _id: ObjectID(debtId) },
      {
        $set: {
          isDebtPaid: true
        }
      }
    );

    db.close();
    return Promise.resolve(true);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

module.exports = {
  createDebt,
  deleteDebt,
  endDebt
};
