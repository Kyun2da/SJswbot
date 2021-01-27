const sequelize = require('sequelize');
const { timetableTemplate } = require('../lib/kakao/timetableTemplate');
const { Timetable, User } = require('../models');

const getTimetable = async (req, res, next) => {
  try {
    const { classname } = req.params;
    const timetableData = await Timetable.findOne({
      where: { classname },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 시간표를 가져왔습니다.', result: timetableData });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getTimetableList = async (req, res, next) => {
  try {
    const timetableDatalist = await Timetable.findAll({
      attributes: ['classname'],
      order: [['classname', 'ASC']],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 시간표가 있는 강의실 목록을 가져왔습니다.',
      result: timetableDatalist,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const postTimetable = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { classname } = req.params;
    await Timetable.create({
      classname,
      link: `/img/${filename}`,
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      modifier: req.userData.sub,
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 시간표가 등록되었습니다.',
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoTimetable = async (req, res, next) => {
  try {
    const classname = req.body.action.params['강의실'];
    const timetableData = await Timetable.findOne({ where: { classname } });
    return res.status(200).send(timetableTemplate(timetableData));
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteTimetable = async (req, res, next) => {
  try {
    const { classname } = req.params;
    await Timetable.destroy({ where: { classname } });
    return res.status(200).send({ success: true, message: '성공적으로 시간표를 삭제하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putTimetable = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { classname } = req.params;
    await Timetable.update(
      {
        link: `/img/${filename}`,
        createdAt: sequelize.fn('NOW'),
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { classname } },
    );
    return res.status(200).send({
      success: true,
      message: '성공적으로 시간표가 수정되었습니다.',
      result: { link: `/img/${filename}` },
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getTimetable,
  getTimetableList,
  postTimetable,
  kakaoTimetable,
  deleteTimetable,
  putTimetable,
};
