const { body } = require('express-validator');

const postProfessorRules = [
  body('name').exists(),
  body('classPosition').exists(),
  body('phoneNumber').exists(),
  body('email').exists(),
];

const putProfessorRules = [
  body('classPosition').exists(),
  body('phoneNumber').exists(),
  body('email').exists(),
];

module.exports.postProfessorRules = postProfessorRules;
module.exports.putProfessorRules = putProfessorRules;
