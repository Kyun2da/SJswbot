const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads폴더가 없어서 uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${req.params.classname}.png`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = {
  upload,
};
