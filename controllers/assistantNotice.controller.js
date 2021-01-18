const { AssistantNotice } = require('../models');

const getAssistantNotice = async (req, res) => {
  try {
    const notice = await AssistantNotice.findAll({ order: [['idx', 'ASC']] });
    console.log(notice);
    return res.status(200).send({
      message: '성공적으로 완료되었습니다.',
      success: true,
      result: notice,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'db에러입니다. 관리자에게 문의해주세요.',
      success: false,
    });
  }
};

module.exports = {
  getAssistantNotice,
};
