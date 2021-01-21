const express = require('express');
const { getStatus, kakaoStatus, putStatus } = require('../controllers/status.controller');
const { validate } = require('../middleware/validation');
const { isLoggedIn } = require('../middleware/validation/auth');
const { putStatusRules } = require('../middleware/validation/status');

const router = express.Router();

router.get('/:department', getStatus);

router.post('/kakao', kakaoStatus);

router.put('/:department', isLoggedIn, validate(putStatusRules), putStatus);

module.exports = router;
