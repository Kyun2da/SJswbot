const { KnowledgePlus } = require('../models');

const getQuestionlist = async (req, res, next) => {
  try {
    const questionData = await KnowledgePlus.findAll();
    let msg = '';
    for (let i = 0; i < questionData.length; i += 1) {
      msg += `${i + 1}. ${questionData[i].question}\n\n`;
    }
    if (msg === '') {
      msg = '등록된 질문이 없습니다.';
    }
    const responseBody = {
      version: '2.0',
      data: {
        msg,
      },
    };
    return res.status(200).send(responseBody);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = getQuestionlist;
