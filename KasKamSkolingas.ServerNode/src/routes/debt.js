const express = require('express');

const auth = require('../auth')();
const {
  createDebt,
  deleteDebt,
  endDebt,
  getGroupDebts,
  getUserDebts
} = require('../services/debtService');

const router = express.Router();

router.post('/', auth.authenticate(), async (req, res) => {
  const userNameTo = req.user.userName;
  const { groupName, userNameFrom, amount, whatFor } = req.body;

  try {
    const result = await createDebt({
      dateCreated: Date.now(),
      groupName,
      userNameFrom,
      userNameTo,
      amount,
      whatFor
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/:id', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;
    const debtId = req.params.id;

    const result = await deleteDebt(userName, debtId);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/end', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;
    const { debtId } = req.body;

    const result = await endDebt(userName, debtId);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/userDebts', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;

    const result = await getUserDebts(userName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/groupDebts', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;

    const { groupName } = req.body;

    const result = await getGroupDebts(groupName, userName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
