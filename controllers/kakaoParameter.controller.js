const { Professor } = require('../models');

const getParameterProfessor = async (req, res, next) => {
  try {
    console.log(req.body.utterance);
    const name = req.body.utterance;
    console.log(name);
    const getProfessorData = await Professor.findOne({
      where: { name },
    });
    console.log(getProfessorData);
    if (getProfessorData === null) {
      return res.status(200).send({
        status: 'FAIL',
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
