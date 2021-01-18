const mailOptions = (to, emailTemplate) => ({
  from: '세종대 소융봇',
  to,
  subject: '세종대 소융봇 회원가입을 위한 인증 메일입니다.',
  html: emailTemplate,
});

module.exports = {
  mailOptions,
};
