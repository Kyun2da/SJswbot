const express = require('express');
const {
  getknowledgePlus,
  getknowledgePluslist,
  getParticularKnowledgePlus,
  kakaoKnowledgePlus,
  enrollKnowledgePlus,
  deleteKnowledgePlus,
  putKnowledgePlus,
} = require('../controllers/knowledgePlus.controller');
const { validate } = require('../middleware/validation');
const { isLoggedIn } = require('../middleware/validation/auth');
const { enrollknowledgePlusRules } = require('../middleware/validation/knowledgePlus');

const router = express.Router();

router.get('/', getknowledgePlus);

router.get('/question/:id', getParticularKnowledgePlus);

router.get('/list/:department', getknowledgePluslist);

router.get('/kakao', kakaoKnowledgePlus);

router.post('/', isLoggedIn, validate(enrollknowledgePlusRules), enrollKnowledgePlus);

router.delete('/:id', isLoggedIn, deleteKnowledgePlus);

router.put('/:id', isLoggedIn, validate(enrollknowledgePlusRules), putKnowledgePlus);

module.exports = router;
