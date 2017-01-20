const express = require('express');

const auth = require('../auth')();
const {
  createDebt,
  deleteDebt
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

router.get('/', (req, res) => {
  res.send('Debt index');
});

module.exports = router;
