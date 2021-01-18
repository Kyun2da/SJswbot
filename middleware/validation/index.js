const { validationResult } = require('express-validator');

module.exports = {
  validate: (schemas) => async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();
    return res
      .status(400)
      .send({ success: false, message: '파라미터 에러입니다.', result: errors });
  },
};
