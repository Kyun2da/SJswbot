const express = require('express');
const {
  getAssistantNotice,
  putAssistantNotice,
} = require('../controllers/assistantNotice.controller');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', isLoggedIn, getAssistantNotice);

router.put('/:department', isLoggedIn, putAssistantNotice);

module.exports = router;
