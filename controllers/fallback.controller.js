const sequelize = require('sequelize');
const {
  fallbackFailEnrollTemplate,
  fallbackCompleteEnrollTemplate,
} = require('../lib/kakao/fallbackTemplate');
const getPagination = require('../lib/pagination');
const { Fallback } = require('../models');

const getFallback = async (req, res, next) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  try {
    const getFallbackData = await Fallback.findAndCountAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 폴백 데이터를 가져왔습니다.',
      result: getFallbackData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteFallback = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Fallback.destroy({
      where: { idx: id },
    });
    return res.status(200).send({ success: true, message: '성공적으로 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoFallback = async (req, res) => {
  const { utterance } = req.body.userRequest;

  try {
    await Fallback.create({
      question: utterance,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
    });

    return res.status(201).send(fallbackCompleteEnrollTemplate);
  } catch (err) {
    console.error(err);
    return res.status(500).send(fallbackFailEnrollTemplate);
  }
};

module.exports = {
  getFallback,
  kakaoFallback,
  deleteFallback,
};
