const { Department } = require('../Models');

const getDepartment = async (req, res, next) => {
  try {
    const users = await Department.findAll({ order: [['idx', 'ASC']] });
    console.log(users);
    res.status(200).json({
      code: 200,
      payload: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: '서버 에러입니다. 관리자에게 문의해주세요.',
    });
  }
};

module.exports = {
  getDepartment,
};
