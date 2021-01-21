const kakaoStatusTemplate = (result) => {
  const status = result.status === 1 ? '근무중' : '휴가중';
  return {
    version: '2.0',
    data: {
      msg: `조교실\n\n 위치: ${result.position}\n 전화: ${result.phoneNumber}\n\n 상태 : ${status}입니다.\n\n 메시지 : ${result.comment}`,
    },
  };
};

module.exports.kakaoStatusTemplate = kakaoStatusTemplate;
