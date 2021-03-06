const sequelize = require('sequelize');
const dayjs = require('dayjs');
const getPagination = require('../lib/pagination');
const { KnowledgePlus, User } = require('../models');
const { enrolltoKakaoKnowledgePlus } = require('../crawling/knowledgePlusToKakao');

const getknowledgePlus = async (req, res, next) => {
  try {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const getKnowledgePlusData = await KnowledgePlus.findAndCountAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
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
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { department } = req.params;
    const getKnowledgePlusListData = await KnowledgePlus.findAndCountAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: { [sequelize.Op.or]: [{ category1: department }, { category1: '공통' }] },
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
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const resultArr2 = [];
    for (let i = 0; i < resultArr.length; i += 1) {
      const { category1, category2, question, questionAnswer, updatedAt } = resultArr[i].dataValues;
      resultArr[
        i
      ].dataValues.questionAnswer = `[카테고리] ${category1} > ${category2}\n\n[질문]\n\n${question} \n\n[답변]\n\n ${questionAnswer}\n\n (${dayjs(
        updatedAt,
      ).format('YYYY-MM-DD')}, ${
        resultArr[i].dataValues.User.username
      })\n\n 데이터가 잘못되었다면 데이터 수정요청 ⚠ 버튼을 눌러주세요.(감동)`;
      delete resultArr[i].dataValues.User;
      resultArr2.push(Object.values(resultArr[i].dataValues));
    }
    const responseBody = {
      values: resultArr2,
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
    if (process.env.NODE_ENV !== 'development') {
      enrolltoKakaoKnowledgePlus();
    }
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
    if (process.env.NODE_ENV !== 'development') {
      enrolltoKakaoKnowledgePlus();
    }
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
    if (process.env.NODE_ENV !== 'development') {
      enrolltoKakaoKnowledgePlus();
    }
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
