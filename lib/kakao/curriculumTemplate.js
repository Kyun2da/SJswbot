const kakaoCurriculumTemplate = (result) => ({
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '어느 학과의 교과 과정을 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '컴퓨터공학과',
                  webLinkUrl: result[0].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '소프트웨어학과',
                  webLinkUrl: result[1].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '정보보호학과',
                  webLinkUrl: result[2].dataValues.link,
                },
              ],
            },
            {
              title: '어느 학과의 교과 과정을 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '데이터사이언스학과',
                  webLinkUrl: result[3].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '디자인이노베이션',
                  webLinkUrl: result[4].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '만화애니메이션텍',
                  webLinkUrl: result[5].dataValues.link,
                },
              ],
            },
            {
              title: '어느 학과의 교과 과정을 알려드릴까요?',
              description: '링크가 연결된 버튼입니다.',
              buttons: [
                {
                  action: 'webLink',
                  label: '스마트기기공학전공',
                  webLinkUrl: result[6].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '무인이동체공학전공',
                  webLinkUrl: result[7].dataValues.link,
                },
                {
                  action: 'webLink',
                  label: '인공지능학과',
                  webLinkUrl: result[8].dataValues.link,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});

module.exports = { kakaoCurriculumTemplate };
