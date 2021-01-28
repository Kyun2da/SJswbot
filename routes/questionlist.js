const express = require('express');
const getQuestionlist = require('../controllers/questionlist');

const router = express.Router();

router.post('/', getQuestionlist);

module.exports = router;
