const kakaoStatusTemplate = (result) => ({
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '어느 학과의 학과공지를 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '컴퓨터공학과',
                  messageText: `조교실\n\n 위치: ${result[0].dataValues.position}\n 전화: ${
                    result[0].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[0].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[0].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '소프트웨어학과',
                  messageText: `조교실\n\n 위치: ${result[1].dataValues.position}\n 전화: ${
                    result[1].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[1].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[1].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '정보보호학과',
                  messageText: `조교실\n\n 위치: ${result[2].dataValues.position}\n 전화: ${
                    result[2].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[2].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[2].dataValues.comment}`,
                },
              ],
            },
            {
              title: '어느 학과의 학과공지를 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '데이터사이언스학과',
                  messageText: `조교실\n\n 위치: ${result[3].dataValues.position}\n 전화: ${
                    result[3].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[3].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[3].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '디자인이노베이션',
                  messageText: `조교실\n\n 위치: ${result[4].dataValues.position}\n 전화: ${
                    result[4].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[4].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[4].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '만화애니메이션텍',
                  messageText: `조교실\n\n 위치: ${result[5].dataValues.position}\n 전화: ${
                    result[5].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[5].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[5].dataValues.comment}`,
                },
              ],
            },
            {
              title: '어느 학과의 학과공지를 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '스마트기기공학전공',
                  messageText: `조교실\n\n 위치: ${result[6].dataValues.position}\n 전화: ${
                    result[6].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[6].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[6].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '무인이동체공학전공',
                  messageText: `조교실\n\n 위치: ${result[7].dataValues.position}\n 전화: ${
                    result[7].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[7].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[7].dataValues.comment}`,
                },
                {
                  action: 'webLink',
                  label: '인공지능학과',
                  messageText: `조교실\n\n 위치: ${result[8].dataValues.position}\n 전화: ${
                    result[8].dataValues.phoneNumber
                  }\n\n 상태 : ${
                    result[8].dataValues.status === 1 ? '근무중' : '휴가중'
                  }입니다.\n\n 메시지 : ${result[8].dataValues.comment}`,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});

module.exports = {
  kakaoStatusTemplate,
};
