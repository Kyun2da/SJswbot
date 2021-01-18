const express = require('express');
const { getDepartment } = require('../controllers/department.controller');

const router = express.Router();

router.get('/', getDepartment);

module.exports = router;
