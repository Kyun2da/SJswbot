const { Professor } = require('../models');

const getParameterProfessor = async (req, res, next) => {
  try {
    console.log(req.body);
    const name = req.body.action.params['교수님'];
    console.log(name);
    const getProfessorData = await Professor.findOne({
      where: { name },
    });
    console.log(getProfessorData);
    if (getProfessorData === null) {
      return res.status(200).send({
        status: 'FAIL',
        message: '요청하신 교수님의 이름이 존재하지 않습니다.',
      });
    }
    return res.status(200).send({
      status: 'SUCCESS',
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getParameterProfessor,
};
