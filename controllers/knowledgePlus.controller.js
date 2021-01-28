const sequelize = require('sequelize');
const getPagination = require('../lib/pagination');
const { KnowledgePlus, User } = require('../models');

const getknowledgePlus = async (req, res, next) => {
  try {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const getKnowledgePlusData = await KnowledgePlus.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 지식+ 데이터를 가져왔습니다.',
      result: getKnowledgePlusData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getknowledgePluslist = async (req, res, next) => {
  try {
    const { department } = req.params;
    const getKnowledgePlusListData = await KnowledgePlus.findAll({
      attributes: ['question'],
      order: [['updatedAt', 'ASC']],
      where: { category1: department },
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 지식+ 리스트를 가져왔습니다.',
      result: getKnowledgePlusListData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getParticularKnowledgePlus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getParticularData = await KnowledgePlus.findOne({ where: { faqno: id } });
    return res.status(200).send({
      success: true,
      message: '성공적으로 특정 지식+를 가져왔습니다.',
      result: getParticularData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoKnowledgePlus = async (req, res, next) => {
  try {
    const resultArr = await KnowledgePlus.findAll({
      attributes: [
        'faqno',
        'category1',
        'category2',
        'category3',
        'category4',
        'category5',
        'question',
        'questionAnswer',
        'landingUrl',
        'imageinfo',
      ],
    });
    const responseBody = {
      values: resultArr,
      names: '세종대 챗봇 FAQ',
      schema_type: '1.0',
    };
    return res.status(200).send(responseBody);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const enrollKnowledgePlus = async (req, res, next) => {
  try {
    const {
      category1,
      category2,
      category3,
      category4,
      category5,
      question,
      questionAnswer,
      landingUrl,
      imageinfo,
    } = req.body;
    await KnowledgePlus.create({
      category1,
      category2,
      category3,
      category4,
      category5,
      question,
      questionAnswer,
      landingUrl,
      imageinfo,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      modifier: req.userData.sub,
    });
    return res.status(200).send({ success: true, message: '성공적으로 지식+가 등록되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteKnowledgePlus = async (req, res, next) => {
  try {
    const { id } = req.params;
    await KnowledgePlus.destroy({ where: { faqno: id } });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 지식+ 질문을 삭제하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putKnowledgePlus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      category1,
      category2,
      category3,
      category4,
      category5,
      question,
      questionAnswer,
      landingUrl,
      imageinfo,
    } = req.body;
    await KnowledgePlus.update(
      {
        category1,
        category2,
        category3,
        category4,
        category5,
        question,
        questionAnswer,
        landingUrl,
        imageinfo,
        createdAt: sequelize.fn('NOW'),
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { faqno: id } },
    );
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 지식+ 질문을 수정하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getknowledgePlus,
  getknowledgePluslist,
  getParticularKnowledgePlus,
  kakaoKnowledgePlus,
  enrollKnowledgePlus,
  deleteKnowledgePlus,
  putKnowledgePlus,
};
