const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const auth = require('../auth')();
const cfg = require('../config');
const { register, passwordSignIn } = require('../services/signInManager');
const { getHomePageData } = require('../services/accountService');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.send(false);
    return;
  }

  let token;

  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);
    token = await register(userName, password, db);
    db.close();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  if (token) {
    res.send(token);
  } else {
    res.send(false);
  }
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  let token;

  try {
    const db = await MongoClient.connect(cfg.dbConnectionUrl);
    token = await passwordSignIn(userName, password, db);
    db.close();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  if (token) {
    res.send(token);
  } else {
    res.sendStatus(400);
  }
});

router.get('/isSignedIn', auth.authenticate(), (req, res) => {
  res.send(true);
});

router.get('/homePageData', auth.authenticate(), async (req, res) => {
  try {
    const { userName } = req.user;

    const result = await getHomePageData(userName);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
