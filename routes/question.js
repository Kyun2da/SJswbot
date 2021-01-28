const express = require('express');
const {
  getQuestion,
  kakaoQuestion,
  deleteQuestion,
} = require('../controllers/question.controller');
const { sendpushMsg } = require('../middleware/sendPushMsg');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', isLoggedIn, getQuestion);

router.post('/kakao', sendpushMsg, kakaoQuestion);

router.delete('/:id', isLoggedIn, deleteQuestion);

module.exports = router;
