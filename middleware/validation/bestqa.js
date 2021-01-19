const { body } = require('express-validator');

const bestqaRules = [body('question').exists()];

module.exports.bestqaRules = bestqaRules;
