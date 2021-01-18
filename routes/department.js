const express = require('express');
const { getDepartment } = require('../controllers/department.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: 학과
 *   description: 등록되어 있는 학과 정보
 */

/**
 * @swagger
 * paths:
 *  /dep:
 *   get:
 *     tags: [학과]
 *     description: '현재 등록되어 있는 학과 정보를 가져옵니다.'
 *     responses:
 *       200:
 *        description: '성공'
 */
router.get('/', getDepartment);

module.exports = router;
