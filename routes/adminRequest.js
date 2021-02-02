const express = require('express');
const {
  getAdminRequest,
  deleteAdminRequest,
  kakaoAdminRequest,
} = require('../controllers/adminRequest.controller');

const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/', isLoggedIn, getAdminRequest);

router.delete('/:id', isLoggedIn, deleteAdminRequest);

router.post('/kakao', kakaoAdminRequest);

module.exports = router;
