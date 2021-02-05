const express = require('express');
const {
  getParameterProfessor,
  getParameterTimetable,
  getParameterDepartment,
  getParameterDepartmentGongtong,
} = require('../controllers/kakaoParameter.controller');

const router = express.Router();

router.post('/professor', getParameterProfessor);

router.post('/timetable', getParameterTimetable);

// 학과사무실, 학과공지
router.post('/department', getParameterDepartment);

router.post('/departmentgongtong', getParameterDepartmentGongtong);
module.exports = router;
