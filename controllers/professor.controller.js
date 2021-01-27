const sequelize = require('sequelize');
const kakaoProfessorTemplate = require('../lib/kakao/professorTemplate');
const getPagination = require('../lib/pagination');
const { Professor, User } = require('../models');

const getProfessor = async (req, res, next) => {
  try {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const getProfessorData = await Professor.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 교수님 데이터를 가져왔습니다.',
      result: getProfessorData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getProfessorList = async (req, res, next) => {
  try {
    const getProfessorListData = await Professor.findAll({
      attributes: ['name'],
      order: [['name', 'ASC']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 교수님 목록을 가져왔습니다.',
      result: getProfessorListData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getParticularProfessor = async (req, res, next) => {
  try {
    const { name } = req.params;
    const getProfessorData = await Professor.findOne({
      where: { name },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 교수님 데이터를 가져왔습니다.',
      result: getProfessorData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoProfessor = async (req, res, next) => {
  try {
    const name = req.body.action.params['교수님'];
    const professorData = await Professor.findOne({
      where: { name },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    console.log(professorData);
    return res.status(200).send(kakaoProfessorTemplate(professorData));
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const postProfessor = async (req, res, next) => {
  try {
    const { name, classPosition, phoneNumber, email } = req.body;
    await Professor.create({
      name,
      classPosition,
      phoneNumber,
      email,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      modifier: req.userData.sub,
    });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 교수님 정보를 등록하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putProfessor = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { classPosition, phoneNumber, email } = req.body;
    await Professor.update(
      {
        classPosition,
        phoneNumber,
        email,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { name } },
    );
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 교수님 정보를 수정하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteProfessor = async (req, res, next) => {
  try {
    const { name } = req.params;
    await Professor.destroy({ where: { name } });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 교수님 정보를 삭제하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getProfessor,
  getProfessorList,
  getParticularProfessor,
  kakaoProfessor,
  postProfessor,
  putProfessor,
  deleteProfessor,
};
