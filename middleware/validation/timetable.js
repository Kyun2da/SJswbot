const { Timetable } = require('../../models');

module.exports = {
  postTimetableParameter: async (req, res, next) => {
    try {
      const { classname } = req.params;
      const data = await Timetable.findOne({ where: { classname } });
      if (data === null) {
        return next();
      }
      return res.status(400).send({ success: false, message: '이미 등록된 강의실 입니다.' });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
