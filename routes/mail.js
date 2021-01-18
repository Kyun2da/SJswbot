const express = require('express');
const { sendEmail, verifyEmail } = require('../controllers/mail.controller');
const { validate } = require('../middleware/validation');
const { sendEmailRules, verifyEmailRules } = require('../middleware/validation/mail');

const router = express.Router();

router.post('/send', validate(sendEmailRules), sendEmail);

router.post('/verify', validate(verifyEmailRules), verifyEmail);

module.exports = router;
