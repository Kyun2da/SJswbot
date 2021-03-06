const { Department } = require('../models');

const getDepartment = async (req, res, next) => {
  try {
    const users = await Department.findAll({ order: [['idx', 'ASC']] });
    return res.status(200).json({
      success: true,
      message: '성공적으로 학과를 가져왔습니다.',
      result: users,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getDepartment,
};
