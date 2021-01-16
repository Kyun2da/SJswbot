const app = require('./app');
const https = require('https');
const fs = require('fs');
const prod = process.env.NODE_ENV === 'production';

if (prod) {
  const options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/cert.pem'),
  };
  https.createServer(options, app).listen(443, () => {
    console.log('443번 포트에서 대기중입니다.');
  });
} else {
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
}
