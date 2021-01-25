const express = require('express');
const { getParameterProfessor } = require('../controllers/kakaoParameter.controller');

const router = express.Router();

router.post('/professor', getParameterProfessor);

module.exports = router;
