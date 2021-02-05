const kakaoNoticeTemplate = (result) => ({
  version: '2.0',
  data: {
    msg: result.dataValues.content,
    link: result.dataValues.link,
  },
});

module.exports = {
  kakaoNoticeTemplate,
};
