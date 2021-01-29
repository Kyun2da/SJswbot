const timetableTemplate = (result) => ({
  version: '2.0',
  template: {
    outputs: [
      {
        simpleImage: {
          imageUrl: `https://sjswbot.site/${result.dataValues.link}`,
          altText: '링크입니다.',
        },
      },
    ],
  },
});

module.exports = {
  timetableTemplate,
};
