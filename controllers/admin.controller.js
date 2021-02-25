const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { User } = require('../models');

const getSignedUserInfo = async (req, res, next) => {
  try {
    const existUsers = await User.findAll({
      where: {
        role: {
          [Op.not]: [1],
        },
      },
      group: ['department'],
      attributes: ['department', [sequelize.fn('COUNT', 'department'), 'count']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 학과별 유저 숫자를 가져왔습니다.',
      result: existUsers,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getSignedUserInfo,
};
