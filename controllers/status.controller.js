const sequelize = require('sequelize');
const { kakaoStatusTemplate } = require('../lib/kakao/statusTemplate');
const { departmentParser } = require('../lib/kakaoDepartmentParser');
const { Status, User } = require('../models');

const getStatus = async (req, res, next) => {
  try {
    const { department } = req.params;
    const statusData = await Status.findOne({
      where: { department },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res
      .status(200)
      .send({ success: true, message: '성공적으로 Status를 가져왔습니다.', result: statusData });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoStatus = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body.intent;
    const statusData = await Status.findOne({ where: { department: departmentParser(name) } });
    console.log(statusData);
    return res.status(200).send(kakaoStatusTemplate(statusData, name));
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putStatus = async (req, res, next) => {
  try {
    const { department } = req.params;
    console.log(department);
    const { status, comment, position, phoneNumber } = req.body;
    await Status.update(
      {
        status,
        comment,
        position,
        phoneNumber,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { department } },
    );
    return res.status(200).send({ success: true, message: '성공적으로 수정을 완료하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getStatus,
  kakaoStatus,
  putStatus,
};
