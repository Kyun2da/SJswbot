const express = require('express');
const { getAssistantNotice } = require('../controllers/assistantNotice.controller');

const router = express.Router();

router.get('/', getAssistantNotice);

module.exports = router;
