const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./Models');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const greenlock = require('greenlock-express');

dotenv.config();
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

const indexRouter = require('./routes');
const departmentRouter = require('./routes/department');
const prod = process.env.NODE_ENV === 'production';
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
  app.use(helmet());
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
    secure: false, //TODO : https로 변경하면 true로 바꾸기
  },
  store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SJswbot API',
      version: '1.0.0',
      description: '세종대 소융봇 API 입니다.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Kyun2da',
        url: 'https://github.com/kyun2da',
        email: 'kyun2dot@gmail.com',
      },
    },
    servers: [{ url: 'https://sjswbot.site/' }, { url: 'http://localhost:8001/' }],
  },
  apis: ['./routes/*.js', './Models/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/', indexRouter);
app.use('/dep', departmentRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

if (prod) {
  greenlock
    .init({
      packageRoot: __dirname,
      configDir: '/etc/letsencrypt',
      maintainerEmail: 'kyun2dot@gmail.com',
      cluster: false,
    })
    .serve(app);
} else {
  app.listen(prod ? process.env.PORT : 8001, () => {
    console.log(`server is running on ${process.env.PORT}, ${process.env.NODE_ENV}`);
  });
}
