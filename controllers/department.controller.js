const { Department } = require('../models');

const getDepartment = async (req, res, next) => {
  try {
    const users = await Department.findAll({ order: [['idx', 'ASC']] });
    console.log(users);
    return res.status(200).json({
      success: true,
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
