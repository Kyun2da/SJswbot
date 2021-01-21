const { body } = require('express-validator');

const putStatusRules = [
  body('status').exists(),
  body('comment').exists(),
  body('position').exists(),
  body('phoneNumber').exists(),
];

module.exports.putStatusRules = putStatusRules;
