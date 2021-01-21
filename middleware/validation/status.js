const { body } = require('express-validator');

const putStatusRules = [body('status').exists(), body('comment').exists()];

module.exports.putStatusRules = putStatusRules;
