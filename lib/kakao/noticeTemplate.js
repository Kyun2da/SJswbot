const dayjs = require('dayjs');

const kakaoNoticeTemplate = (result, department) => ({
  contents: [
    {
      type: 'card.text',
      cards: [
        {
          description: `[${department} 공지사항]\n\n${
            result.dataValues.content
          }\n\n수정한 시간 : ${dayjs(result.dataValues.updatedAt).format(
            'YYYY-MM-DD',
          )}\n수정한 사람 : ${result.dataValues.User.username}`,
          buttons: [
            {
              type: 'url',
              label: '학과 홈페이지 가기',
              data: { url: result.dataValues.link },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = {
  kakaoNoticeTemplate,
};
