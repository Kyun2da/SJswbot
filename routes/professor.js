const express = require('express');
const {
  getProfessor,
  getProfessorList,
  getParticularProfessor,
  kakaoProfessor,
  postProfessor,
  putProfessor,
  deleteProfessor,
} = require('../controllers/professor.controller');
const { validate } = require('../middleware/validation');
const { isLoggedIn } = require('../middleware/validation/auth');
const { postProfessorRules, putProfessorRules } = require('../middleware/validation/professor');

const router = express.Router();

router.get('/', getProfessor);

router.get('/list', getProfessorList);

router.get('/:name', getParticularProfessor);

router.post('/kakao', kakaoProfessor);

router.post('/', isLoggedIn, validate(postProfessorRules), postProfessor);

router.put('/:name', isLoggedIn, validate(putProfessorRules), putProfessor);

router.delete('/:name', isLoggedIn, deleteProfessor);

module.exports = router;
