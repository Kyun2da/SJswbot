const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

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
};

module.exports.signUpValidationRules = signUpValidationRules;
module.exports.loginValidationRules = loginValidationRules;
module.exports.idCheckValidationRules = idCheckValidationRules;
