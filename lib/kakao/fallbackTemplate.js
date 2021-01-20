const fallbackCompleteEnrollTemplate = {
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '소융봇이 모르는 질문입니다.',
              description:
                '챗봇은 지금도 성장하고 있습니다.(신나) \n 필요한 질문을 입력하거나 챗봇 홈의 주요 카테고리를 이용해보세요!',
              thumbnail: {
                imageUrl:
                  'https://user-images.githubusercontent.com/51112542/97442738-83e6c200-196d-11eb-9ffa-69c34c121d3a.png',
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

const fallbackFailEnrollTemplate = {
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '소융봇이 모르는 질문입니다.',
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
    quickReplies: [
      {
        label: '홈',
        action: 'block',
        messageText: '홈',
        blockId: '5f9ae8b428bc3f16d01e8fc8',
      },
      {
        label: '질문하기',
        action: 'block',
        blockId: '5fabd170dcbcb207064a00fc',
      },
      {
        label: '도움말',
        action: 'block',
        messageText: '도움말',
        blockId: '5efd9279c228c2000109f91e',
      },
    ],
  },
};

module.exports.fallbackCompleteEnrollTemplate = fallbackCompleteEnrollTemplate;
module.exports.fallbackFailEnrollTemplate = fallbackFailEnrollTemplate;
