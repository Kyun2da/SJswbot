const app = require('./app');
const http2 = require('http2');
const prod = process.env.NODE_ENV === 'production';

if (prod) {
  http2
    .createSecureServer(
      {
        ca: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/fullchain.pem'),
        key: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/private.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/sjswbot.site/cert.pem'),
      },
      (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node</h1>');
        res.end('<p>Hello Server!</p>');
      },
    )
    .listen(443, () => {
      console.log('443번 포트에서 대기중입니다.');
    });
} else {
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
}
