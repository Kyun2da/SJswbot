const sequelize = require('sequelize');
const { Curriculum, User } = require('../models');
const { kakaoCurriculumTemplate } = require('../lib/kakao/curriculumTemplate');

const getCurriculum = async (req, res, next) => {
  try {
    const { department } = req.params;
    const getCurriculumData = await Curriculum.findOne({
      where: { department },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send({
      success: true,
      message: '성공적으로 교과과정을 가져왔습니다.',
      result: getCurriculumData,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoCurriculum = async (req, res, next) => {
  try {
    const getCurriculumData = await Curriculum.findAll({});
    return res.status(200).send(kakaoCurriculumTemplate(getCurriculumData));
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putCurriculum = async (req, res, next) => {
  try {
    const { department } = req.params;
    const { link } = req.body;
    await Curriculum.update(
      {
        link,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { department } },
    );
    return res.status(200).send({ success: true, message: '성공적으로 수정이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getCurriculum,
  kakaoCurriculum,
  putCurriculum,
};
