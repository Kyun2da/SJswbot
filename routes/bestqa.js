const express = require('express');

const {
  getBestqa,
  getParticularBestqa,
  putBestqa,
  kakaoBestqa,
} = require('../controllers/bestqa.controller');
const { isLoggedIn } = require('../middleware/validation/auth');
const { bestqaRules } = require('../middleware/validation/bestqa');

const router = express.Router();

router.get('/', getBestqa);

router.get('/:id', getParticularBestqa);

router.post('/kakao', kakaoBestqa);

router.put('/:id', isLoggedIn, bestqaRules, putBestqa);

module.exports = router;
