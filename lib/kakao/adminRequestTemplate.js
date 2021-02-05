const kakaoAdminRequestTemplate = {
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
                  'https://user-images.githubusercontent.com/51112542/107036136-7bb7e180-67fc-11eb-858e-7bb888c0e3c7.jpg',
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

module.exports.kakaoAdminRequestTemplate = kakaoAdminRequestTemplate;
