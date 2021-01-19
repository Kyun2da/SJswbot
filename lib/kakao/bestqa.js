const kakaoBestqaTemplate = (result) => ({
  version: '2.0',
  template: {
    outputs: [
      {
        carousel: {
          type: 'basicCard',
          items: [
            {
              title: '자주묻는 질문',
              description: '조교가 선정한 자주묻는 질문입니다.',
              thumbnail: {
                imageUrl:
                  'https://user-images.githubusercontent.com/51112542/86387843-c0135a00-bcce-11ea-8835-8267570bfbdb.png',
              },
              buttons: [
                {
                  action: 'message',
                  label: 'Top 1 🥇',
                  messageText: result[0].question,
                },
                {
                  action: 'message',
                  label: 'Top 2 🥈',
                  messageText: result[1].question,
                },
                {
                  action: 'message',
                  label: 'Top 3 🥉',
                  messageText: result[2].question,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});

module.exports.kakaoBestqaTemplate = kakaoBestqaTemplate;
