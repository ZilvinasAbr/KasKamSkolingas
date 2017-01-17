const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Account index');
});

module.exports = router;
