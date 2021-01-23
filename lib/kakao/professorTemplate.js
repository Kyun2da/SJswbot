const dayjs = require('dayjs');

const kakaoProfessorTemplate = (result) => ({
  version: '2.0',
  data: {
    msg: `[${result.dataValues.name} 교수님의 연구실]\n\n위치 : ${
      result.dataValues.classPosition
    }\n전화 : ${result.dataValues.phoneNumber}\nEmail : ${
      result.dataValues.email
    }\n\n수정시간: ${dayjs(result.dataValues.updatedAt).format('YYYY-MM-DD')}\n수정한 사람 : ${
      result.dataValues.User.username
    }`,
  },
});

module.exports = kakaoProfessorTemplate;
