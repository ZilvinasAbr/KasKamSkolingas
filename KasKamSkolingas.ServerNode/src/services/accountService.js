const { MongoClient } = require('mongodb');
const _ = require('lodash');

const cfg = require('../config');

function getHomePageGroupData(userName, groupName, groupDebts) {
  const inDebt = groupDebts
    .filter(debt => debt.userNameFrom === userName)
    .reduce((acc, current) => acc + current.amount, 0);

  const debtTo = groupDebts
    .filter(debt => debt.userNameTo === userName)
    .reduce((acc, current) => acc + current.amount, 0);

  const formattedDebts = groupDebts.map(debt => ({
    userInDebt: debt.userNameFrom,
    userDebtTo: debt.userNameTo,
    whatFor: debt.whatFor,
    amount: debt.amount
  }));

  return {
    name: groupName,
    inDebt,
    debtTo,
    debts: formattedDebts
  };
}

async function getHomePageGroupsData(userName, groupNames, db) {
  try {
    const groupsDebts = await db.collection('debts')
      .find({
        groupName: {
          $in: groupNames
        }
      })
      .toArray();

    const groupedGroupDebts = _.groupBy(groupsDebts, 'groupName');

    const result = [];

    for (const groupName in groupedGroupDebts) {
      const formattedGroupData = getHomePageGroupData(
        userName, groupName, groupedGroupDebts[groupName]
      );
      result.push(formattedGroupData);
    }

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getHomePageData(userName) {
  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);

    let userFound = await db.collection('users')
      .findOne({ userName });
    let userGroupsFound = db.collection('userGroups')
      .find({ userName })
      .toArray();

    userFound = await userFound;
    userGroupsFound = await userGroupsFound;

    if (!userFound) {
      return Promise.resolve(null);
    }

    if (userGroupsFound.length <= 0) {
      return Promise.resolve({
        groups: []
      });
    }

    const groups = userGroupsFound.map(ug => ug.groupName);

    const groupsData = await getHomePageGroupsData(userName, groups, db);

    db.close();
    return Promise.resolve({
      groups: groupsData
    });
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

module.exports = {
  getHomePageData
};
