const sequelize = require('sequelize');
const {
  kakaoFixRequestTemplate,
  kakaoFixRequestfailEnrollTemplate,
} = require('../lib/kakao/fixRequestTemplate');
const getPagination = require('../lib/pagination');
const { AdminRequest } = require('../models');

const getAdminRequest = async (req, res, next) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  try {
    const getAdminRequestData = await AdminRequest.findAndCountAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 관리자에게 요청하는 데이터를 가져왔습니다.',
      result: getAdminRequestData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteAdminRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    await AdminRequest.destroy({
      where: { idx: id },
    });
    return res.status(200).send({ success: true, message: '성공적으로 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoAdminRequest = async (req, res) => {
  const reqData = req.body.action.params['질문'];

  try {
    await AdminRequest.create({
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
  getAdminRequest,
  kakaoAdminRequest,
  deleteAdminRequest,
};
