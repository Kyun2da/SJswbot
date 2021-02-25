const express = require('express');
const { getSignedUserInfo } = require('../controllers/admin.controller');
const { isLoggedIn, isAdmin } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/user', isLoggedIn, isAdmin, getSignedUserInfo);

module.exports = router;
