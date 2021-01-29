const sequelize = require('sequelize');
const {
  kakaoFixRequestTemplate,
  kakaoFixRequestfailEnrollTemplate,
} = require('../lib/kakao/fixRequestTemplate');
const getPagination = require('../lib/pagination');
const { FixRequest } = require('../models');

const getFixRequest = async (req, res, next) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  try {
    const getFixRequestData = await FixRequest.findAndCountAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 수정요청 데이터를 가져왔습니다.',
      result: getFixRequestData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteFixRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    await FixRequest.destroy({
      where: { idx: id },
    });
    return res.status(200).send({ success: true, message: '성공적으로 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoFixRequest = async (req, res) => {
  const reqData = req.body.action.params['질문'];

  try {
    await FixRequest.create({
      question: reqData,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
    });

    return res.status(201).send(kakaoFixRequestTemplate);
  } catch (err) {
    console.error(err);
    return res.status(500).send(kakaoFixRequestfailEnrollTemplate);
  }
};

module.exports = {
  getFixRequest,
  kakaoFixRequest,
  deleteFixRequest,
};
