const cryptoRandomString = require('crypto-random-string');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const { EmailVerify } = require('../models');
const { mailOptions } = require('../lib/mailOption');

const sendEmail = async (req, res, next) => {
  const rand = cryptoRandomString({ length: 6, type: 'numeric' });
  let emailTemplete;
  res.render('../views/email.ejs', { authCode: rand }, (err, data) => {
    if (err) {
      console.log(err);
      console.log('ejs.renderFile err');
    }
    emailTemplete = data;
  });

  const existEmail = await EmailVerify.findOne({
    where: {
      email: Sequelize.fn('lower', req.body.to),
    },
  });
  if (existEmail) {
    try {
      console.log('이메일이 존재합니다.');
      await EmailVerify.update(
        {
          number: rand,
        },
        { where: { email: req.body.to } },
      );
    } catch (error) {
      console.error(error);
      return next(error);
    }
  } else {
    try {
      await EmailVerify.create({
        email: req.body.to,
        number: rand,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  try {
    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await smtpTransport.sendMail(mailOptions(req.body.to, emailTemplete));
    console.log('메시지를 보냈습니다.');
    return res.status(201).send({ success: true, message: '성공적으로 메시지를 보냈습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { email, authNumber } = req.body;
  try {
    const existEmail = await EmailVerify.findOne({
      where: {
        email: Sequelize.fn('lower', email),
      },
    });
    if (existEmail) {
      console.log(existEmail.number);
      if (existEmail.number === authNumber) {
        await EmailVerify.destroy({
          where: {
            email: Sequelize.fn('lower', email),
          },
        });
        return res.status(200).send({ success: true, message: '이메일 인증에 성공하였습니다.' });
      }
      return res.status(400).send({ success: false, message: '인증 번호가 다릅니다.' });
    }
    return res
      .status(400)
      .send({ success: false, message: '인증을 요청한 이메일이 존재하지 않습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  sendEmail,
  verifyEmail,
};
