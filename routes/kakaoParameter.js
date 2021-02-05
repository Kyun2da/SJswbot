const express = require('express');
const {
  getParameterProfessor,
  getParameterTimetable,
  getParameterDepartment,
} = require('../controllers/kakaoParameter.controller');

const router = express.Router();

router.post('/professor', getParameterProfessor);

router.post('/timetable', getParameterTimetable);

router.post('/department', getParameterDepartment);

module.exports = router;
