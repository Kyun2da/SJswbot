const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { User } = require('../../models');

const signUpValidationRules = [
  body('userid').exists(),
  body('username').exists(),
  body('password').exists().isLength({ min: 6 }),
  body('phoneNumber').exists(),
  body('email').exists().isEmail(),
  body('department').exists().isNumeric(),
];

const loginValidationRules = [body('userid').exists(), body('password').exists()];

const idCheckValidationRules = [body('userid').exists()];

module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = decoded;
      return next();
    } catch (err) {
      return res.status(401).send({ success: false, msg: '토큰이 타당하지 않습니다.' });
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      const existUser = await User.findOne({
        where: {
          idx: Sequelize.fn('lower', req.userData.sub),
        },
      });
      if (existUser.role !== 1) {
        return res
          .status(401)
          .send({ success: false, msg: '관리자가 아닌 사용자는 접근할 수 없습니다.' });
      }
      return next();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};

module.exports.signUpValidationRules = signUpValidationRules;
module.exports.loginValidationRules = loginValidationRules;
module.exports.idCheckValidationRules = idCheckValidationRules;
