const express = require('express');
const {
  getCurriculum,
  kakaoCurriculum,
  putCurriculum,
} = require('../controllers/curriculum.controller');
const { upload } = require('../middleware/upload');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', getCurriculum);

router.post('/kakao', kakaoCurriculum);

router.put('/:department', isLoggedIn, upload.single('img'), putCurriculum);

module.exports = router;
