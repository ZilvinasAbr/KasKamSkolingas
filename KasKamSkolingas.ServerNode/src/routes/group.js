const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Group index');
});

module.exports = router;
