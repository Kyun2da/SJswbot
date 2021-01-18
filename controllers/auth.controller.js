const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('../models/user.db');
const utils = require('../lib/utils');

const signUp = async (req, res, next) => {
  const { userid, username, phoneNumber, password, email, department } = req.body;

  try {
    const existUser = await User.findOne({
      where: {
        userid: Sequelize.fn('lower', userid),
      },
    });
    if (existUser) {
      return res.status(409).send({ success: false, message: '이미 존재하는 아이디 입니다.' });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userid,
      username,
      password: hash,
      phoneNumber,
      email,
      department,
      role: 1,
    });
    return res.status(201).send({ success: true, msg: '성공적으로 회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const idCheck = async (req, res, next) => {
  const { userid } = req.body;
  try {
    const existUser = await User.findOne({
      where: {
        userid: Sequelize.fn('lower', userid),
      },
    });
    if (existUser) {
      return res.status(409).send({ success: false, message: '이미 사용중인 아이디 입니다.' });
    }
    return res.status(200).send({ success: true, message: '사용 가능한 id 입니다.' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { userid, password } = req.body;
  try {
    const existUser = await User.findOne({
      where: {
        userid: Sequelize.fn('lower', userid),
      },
    });
    if (!existUser) {
      return res.status(401).send({ success: false, message: '유저를 찾을 수 없습니다.' });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);

    if (validPassword) {
      const tokenObject = utils.issueJWT(existUser);
      return res.status(200).send({
        success: true,
        message: '로그인에 성공하였습니다.',
        result: [
          {
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            user: existUser.username,
            department: existUser.department,
            role: existUser.role,
          },
        ],
      });
    }
    return res.status(401).send({ success: false, message: '비밀번호가 다릅니다.' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const check = async (req, res, next) => {
  console.log(req.userData);
  try {
    const existUser = await User.findOne({
      where: {
        userid: Sequelize.fn('lower', req.userData.sub),
      },
    });
    const tokenObject = utils.issueJWT(existUser);
    return res.status(200).send({
      success: true,
      message: '로그인 중입니다.',
      result: [
        {
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          user: existUser.username,
          department: existUser.department,
          role: existUser.role,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  signUp,
  idCheck,
  login,
  check,
};
