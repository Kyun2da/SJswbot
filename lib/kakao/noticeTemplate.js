const dayjs = require('dayjs');

const kakaoNoticeTemplate = (result, department) => ({
  version: '2.0',
  template: {
    outputs: [
      {
        basicCard: {
          description: `[${department} 공지사항]\n\n${
            result.dataValues.content
          }\n\n수정한 시간 : ${dayjs(result.dataValues.updatedAt).format(
            'YYYY-MM-DD',
          )}\n수정한 사람 : ${result.dataValues.User.username}`,
          buttons: [
            {
              action: 'webLink',
              label: '학과 홈페이지 가기',
              webLinkUrl: result.dataValues.link,
            },
          ],
        },
      },
    ],
  },
});

module.exports = {
  kakaoNoticeTemplate,
};
