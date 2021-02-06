const admin = require('firebase-admin');

module.exports = {
  sendpushMsg: (req, res, next) => {
    let topic;
    switch (req.body.userRequest.utterance) {
      case '공통':
        topic = 'public';
        break;
      case '소프트웨어학과':
        topic = 'software';
        break;
      case '컴퓨터공학과':
        topic = 'computer';
        break;
      case '데이터사이언스학과':
        topic = 'datascience';
        break;
      case '지능기전공학부':
        topic = 'im';
        break;
      case '정보보호학과':
        topic = 'information';
        break;
      case '디자인이노베이션':
        topic = 'design';
        break;
      case '만화애니메이션텍':
        topic = 'cartoon';
        break;
      case '스마트기기공학전공':
        topic = 'smart';
        break;
      case '무인이동체공학전공':
        topic = 'imc';
        break;
      case '인공지능학과':
        topic = 'ai';
        break;
      default:
        topic = '??';
        break;
    }
    // req.body.userRequest.utterance
    const content = req.body.action.params['질문']
      ? req.body.action.params['질문']
      : req.body.action.params['수정요청'];
    const fcmMsg = {
      data: {
        title: req.body.action.params['질문']
          ? '소융봇에 새로운 질문이 등록되었습니다!'
          : '소융봇에 새로운 수정요청 사항이 등록되었습니다!',
        body: content,
      },
      topic,
    };
    admin
      .messaging()
      .send(fcmMsg)
      .then((response) => {
        console.log('성공적으로 메시지를 보냈습니다.', response);
      })
      .catch((error) => {
        console.error('메시지 에러입니다.', error);
      });
    return next();
  },
};
