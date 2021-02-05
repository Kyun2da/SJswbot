const sequelize = require('sequelize');
const { kakaoNoticeTemplate } = require('../lib/kakao/noticeTemplate');
const { departmentParser } = require('../lib/kakaoDepartmentParser');
const { Notice, User } = require('../models');

const getNotice = async (req, res, next) => {
  try {
    const { department } = req.params;
    const noticeData = await Notice.findOne({
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
      .send({ success: true, message: '성공적으로 공지사항을 가져왔습니다', result: noticeData });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const kakaoNotice = async (req, res, next) => {
  try {
    const department = departmentParser(req.body.action.params['학과']);
    const getNoticeData = await Notice.findOne({
      where: { department },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send(kakaoNoticeTemplate(getNoticeData));
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putNotice = async (req, res, next) => {
  try {
    const { department } = req.params;
    const { link, content } = req.body;
    await Notice.update(
      {
        link,
        content,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { department } },
    );
    return res.status(200).send({ success: true, message: '성공적으로 데이터를 수정하였습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getNotice,
  kakaoNotice,
  putNotice,
};
