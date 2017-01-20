const express = require('express');

const auth = require('../auth')();
const {
  createGroup,
  addUserToGroup,
  leaveGroup,
  getGroupData
} = require('../services/groupService');

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

router.post('/addtogroup', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;
    const { userName: userNameToAdd, groupName } = req.body;

    const result = await addUserToGroup(userName, groupName, userNameToAdd);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/leave', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;
    const { groupName } = req.body;

    const result = await leaveGroup(userName, groupName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('getGroupData', async (req, res) => {
  try {
    const { userName } = req.user;
    const { groupName } = req.body;

    const result = await getGroupData(userName, groupName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
