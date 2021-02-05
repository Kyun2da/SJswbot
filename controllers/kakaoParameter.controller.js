const { Professor, Timetable, Department } = require('../models');

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

const getParameterTimetable = async (req, res, next) => {
  try {
    const name = req.body.utterance;
    const getTimetableData = await Timetable.findOne({
      where: { classname: name },
    });
    if (getTimetableData === null) {
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

const getParameterDepartment = async (req, res, next) => {
  try {
    const name = req.body.utterance;
    const getDepartmentData = await Department.findOne({
      where: { department: name },
    });
    if (getDepartmentData === null || name === '공통' || name === '관리자') {
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
  getParameterTimetable,
  getParameterDepartment,
};
