const express = require('express');
const {
  signUpValidationRules,
  loginValidationRules,
  isLoggedIn,
  idCheckValidationRules,
} = require('../middleware/validation/auth');
const { validate } = require('../middleware/validation/index');
const { signUp, login, check, idCheck } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', validate(signUpValidationRules), signUp);

router.get('/idCheck', validate(idCheckValidationRules), idCheck);

router.post('/login', validate(loginValidationRules), login);

router.get('/check', isLoggedIn, check);

module.exports = router;
