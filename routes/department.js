const express = require('express');
const Department = require('../Models/assistantNotice');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Department.findAll();
    console.log(users);
    res.json({
      code: 200,
      payload: users,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
