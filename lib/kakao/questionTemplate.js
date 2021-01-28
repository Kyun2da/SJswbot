const questionComplete = {
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '성공적으로 질문이 등록되었습니다.',
              description: '챗봇의 성장에 기여해주셔서 감사합니다.(신나)\n',
              thumbnail: {
                imageUrl:
                  'https://user-images.githubusercontent.com/51112542/100705401-79936a00-33ea-11eb-957a-7e0ffc0358b5.png',
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
      {
        label: '조교님께 질문하기',
        action: 'block',
        blockId: '5fabd170dcbcb207064a00fc',
      },
    ],
  },
};

module.exports.questionComplete = questionComplete;
