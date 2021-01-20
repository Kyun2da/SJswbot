const express = require('express');

const { isLoggedIn } = require('../middleware/validation/auth');
const {
  getFallback,
  kakaoFallback,
  deleteFallback,
} = require('../controllers/fallback.controller');

const router = express.Router();

router.get('/', isLoggedIn, getFallback);

router.delete('/:id', isLoggedIn, deleteFallback);

router.post('/kakao', kakaoFallback);

module.exports = router;
