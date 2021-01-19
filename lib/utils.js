const jsonwebtoken = require('jsonwebtoken');

const issueJWT = (user) => {
  const { idx } = user;
  const expiresIn = '7d';

  const payload = {
    sub: idx,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports.issueJWT = issueJWT;
