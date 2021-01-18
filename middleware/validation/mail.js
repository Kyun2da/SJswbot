const { body } = require('express-validator');

const sendEmailRules = [body('to').exists()];

const verifyEmailRules = [body('email').exists(), body('authNumber').exists()];

module.exports.sendEmailRules = sendEmailRules;
module.exports.verifyEmailRules = verifyEmailRules;
