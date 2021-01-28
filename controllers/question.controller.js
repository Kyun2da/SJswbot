const sequelize = require('sequelize');
const { questionComplete } = require('../lib/kakao/questionTemplate');
const getPagination = require('../lib/pagination');
const { Question } = require('../models');
const { departmentParser } = require('../lib/kakaoDepartmentParser');

const getQuestion = async (req, res, next) => {
  try {
    const { department } = req.params;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const getQuestionData = await Question.findAll({ where: { department } }, { offset, limit });
    return res.status(200).send({
      success: true,
      message: '성공적으로 질문 목록을 가져왔습니다.',
      result: getQuestionData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoQuestion = async (req, res, next) => {
  try {
    const department = departmentParser(req.body.userRequest.utterance);
    const content = req.body.action.params['질문'];
    await Question.create({
      content,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      department,
    });

    return res.status(200).send(questionComplete);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Question.destroy({ where: { idx: id } });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 학생 질문을 삭제하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getQuestion,
  kakaoQuestion,
  deleteQuestion,
};
