const express = require('express');
const { getNotice, kakaoNotice, putNotice } = require('../controllers/notice.controller');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', getNotice);

router.post('/kakao', kakaoNotice);

router.put('/:department', isLoggedIn, putNotice);

module.exports = router;
