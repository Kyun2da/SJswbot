const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = express.Router();

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
    servers: [{ url: 'https://sjswbot.site' }, { url: 'http://localhost:8001/' }],
  },
  apis: ['routes/swagger/*.yaml', 'models/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
