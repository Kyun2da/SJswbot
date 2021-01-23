const kakaoFixRequestTemplate = {
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '성공적으로 요청이 전달되었습니다.',
              description:
                '소융봇 개선에 기여해주셔서 감사합니다.(신나) \n 필요한 질문을 입력하거나 챗봇 홈의 주요 카테고리를 이용해보세요!',
              thumbnail: {
                imageUrl:
                  'https://user-images.githubusercontent.com/51112542/100541205-80549c80-3285-11eb-8230-f0d1d9bd468f.jpg',
              },
            },
          ],
        },
      },
    ],
    quickReplies: [
      {
        label: '홈',
        action: 'block',
        blockId: '5f9ae8b428bc3f16d01e8fc8',
      },
      {
        label: '도움말',
        action: 'block',
        blockId: '5efd9279c228c2000109f91e',
      },
    ],
  },
};

const kakaoFixRequestfailEnrollTemplate = {
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '서버에 전달을 실패하였습니다.',
              description: '현재 서버가 올바르게 작동중이아닙니다. 관리자에게 메일부탁드립니다.',
              thumbnail: {
                imageUrl:
                  'https://user-images.githubusercontent.com/51112542/97442738-83e6c200-196d-11eb-9ffa-69c34c121d3a.png',
              },
            },
          ],
        },
      },
    ],
  },
};

module.exports.kakaoFixRequestTemplate = kakaoFixRequestTemplate;
module.exports.kakaoFixRequestfailEnrollTemplate = kakaoFixRequestfailEnrollTemplate;
