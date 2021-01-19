const sequelize = require('sequelize');
const { AssistantNotice, User } = require('../models');

const getAssistantNotice = async (req, res, next) => {
  const { department } = req.params;
  try {
    const notice = await AssistantNotice.findOne({
      where: { department },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).send({
      message: '성공적으로 완료되었습니다.',
      success: true,
      result: notice,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const putAssistantNotice = async (req, res, next) => {
  const { department } = req.params;
  const { content } = req.body;
  try {
    const putNotice = await AssistantNotice.update(
      {
        content,
        updatedAt: sequelize.fn('NOW'),
        modifier: req.userData.sub,
      },
      { where: { department } },
    );
    return res.status(200).send({
      message: '성공적으로 완료되었습니다.',
      success: putNotice,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getAssistantNotice,
  putAssistantNotice,
};
