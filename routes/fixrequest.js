const express = require('express');
const {
  getFixRequest,
  deleteFixRequest,
  kakaoFixRequest,
} = require('../controllers/fixRequest.controller');
const { sendpushMsg } = require('../middleware/sendPushMsg');

const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', isLoggedIn, getFixRequest);

router.delete('/:id', isLoggedIn, deleteFixRequest);

router.post('/kakao', sendpushMsg, kakaoFixRequest);

module.exports = router;
