const express = require('express');

const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const session = require('cookie-session');
const { sequelize } = require('./models');

dotenv.config();

const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const departmentRouter = require('./routes/department');
const mailRouter = require('./routes/mail');
const assistantNoticeRouter = require('./routes/assistantNotice');
const bestqaRouter = require('./routes/bestqa');
const swaggerDoc = require('./swaggerDoc');

const app = express();

app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

// morgan 설정
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet()); // swagger 때문에 없앰
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use('/', indexRouter);
app.use('/dep', departmentRouter);
app.use('/auth', authRouter);
app.use('/mail', mailRouter);
app.use('/assistantNotice', assistantNoticeRouter);
app.use('/bestqa', bestqaRouter);
app.use(swaggerDoc);

// 지정된 url이 없을 경우 일로옴
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res
    .status(500)
    .send({ success: false, message: '서버 에러입니다. 관리자에게 문의하세요.' });
});

module.exports = app;
