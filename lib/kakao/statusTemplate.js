const kakaoStatusTemplate = (result) => {
  console.log(result);
  const status = result.status === 1 ? '근무중' : '휴가중';
  return {
    version: '2.0',
    data: {
      msg: `상태 : ${status}입니다.\n\n 메시지 : ${result.comment}`,
    },
  };
};

module.exports.kakaoStatusTemplate = kakaoStatusTemplate;
