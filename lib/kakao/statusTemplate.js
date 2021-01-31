const kakaoStatusTemplate = (result) => {
  const status = result.dataValues.status === 1 ? '근무중' : '휴가중';
  return {
    version: '2.0',
    data: {
      msg: `조교실\n\n 위치: ${result.dataValues.position}\n 전화: ${result.dataValues.phoneNumber}\n\n 상태 : ${status}입니다.\n\n 메시지 : ${result.dataValues.comment}`,
    },
  };
};

module.exports.kakaoStatusTemplate = kakaoStatusTemplate;
