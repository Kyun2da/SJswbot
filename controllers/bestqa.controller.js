const sequelize = require('sequelize');
const { kakaoBestqaTemplate } = require('../lib/kakao/bestqaTemplate');
const { Bestqa, User } = require('../models');

const getBestqa = async (req, res, next) => {
  try {
    const bestqa = await Bestqa.findAll({
      order: [['idx', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: '성공적으로 자주묻는 질문을 전부 가져왔습니다.',
      result: bestqa,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getParticularBestqa = async (req, res, next) => {
  const idx = req.params.id;
  try {
    const bestqa = await Bestqa.findOne({
      where: { idx },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: '성공적으로 자주묻는 질문을 가져왔습니다.',
      result: bestqa,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoBestqa = async (req, res, next) => {
  try {
    const bestqa = await Bestqa.findAll({
      order: [['idx', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const responseBody = kakaoBestqaTemplate(bestqa);
    return res.status(200).send(responseBody);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putBestqa = async (req, res, next) => {
  const { id } = req.params;
  const { question } = req.body;
  try {
    const bestqa = await Bestqa.update(
      {
        question,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { idx: id } },
    );
    return res.status(200).json({
      success: true,
      message: '성공적으로 자주묻는 질문을 가져왔습니다.',
      result: bestqa,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getBestqa,
  getParticularBestqa,
  putBestqa,
  kakaoBestqa,
};
