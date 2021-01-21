const express = require('express');
const {
  getCurriculum,
  kakaoCurriculum,
  putCurriculum,
} = require('../controllers/curriculum.controller');
const { isLoggedIn } = require('../middleware/validation/auth');

const router = express.Router();

router.get('/:department', getCurriculum);

router.post('/kakao', kakaoCurriculum);

router.put('/:department', isLoggedIn, putCurriculum);

module.exports = router;
