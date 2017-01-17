const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Debt index');
});

module.exports = router;
