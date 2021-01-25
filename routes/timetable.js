const express = require('express');
const {
  getTimetable,
  postTimetable,
  kakaoTimetable,
  deleteTimetable,
  putTimetable,
} = require('../controllers/timetable.controller');
const { upload } = require('../middleware/upload');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:classname', getTimetable);

router.post('/kakao', kakaoTimetable);

router.post('/:classname', isLoggedIn, upload.single('img'), postTimetable);

router.delete('/:classname', isLoggedIn, deleteTimetable);

router.put('/:classname', isLoggedIn, upload.single('img'), putTimetable);

module.exports = router;
