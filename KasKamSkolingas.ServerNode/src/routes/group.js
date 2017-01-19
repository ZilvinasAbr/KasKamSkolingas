const express = require('express');

const auth = require('../auth')();
const { createGroup } = require('../services/groupService');

const router = express.Router();


router.post('/', auth.authenticate(), async (req, res) => {
  const { userName } = req.user;
  const groupName = req.body.groupName;

  try {
    const result = await createGroup(userName, groupName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
