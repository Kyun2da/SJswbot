const express = require('express');
const Department = require('../Models/assistantNotice');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello World!');
});

module.exports = router;
