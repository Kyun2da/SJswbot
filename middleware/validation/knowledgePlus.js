const { body } = require('express-validator');

const enrollknowledgePlusRules = [
  body('category1').exists(),
  body('category2').exists(),
  body('question').exists(),
  body('questionAnswer').exists(),
];

module.exports.enrollknowledgePlusRules = enrollknowledgePlusRules;
