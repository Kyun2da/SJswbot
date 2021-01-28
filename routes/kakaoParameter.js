const express = require('express');
const {
  getParameterProfessor,
  getParameterTimetable,
} = require('../controllers/kakaoParameter.controller');

const router = express.Router();

router.post('/professor', getParameterProfessor);

router.post('/timetable', getParameterTimetable);

module.exports = router;
