const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  // app.use(helmet());
  // app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use(cors({ origin: true, credentials: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`현재 포트 http://localhost:${port}에서 구동중입니다..`);
});
