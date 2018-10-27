var jwt = require("jsonwebtoken");
const nanoId = require("nanoid");

const secret = process.env.JWT_SECRET;

const algorithm = "HS256";
const audience = "http://web.adot.app"; // https://tools.ietf.org/html/rfc7519#section-4.1.3
const issuer = "http://api.adot.app"; // https://tools.ietf.org/html/rfc7519#section-4.1.1
// subject https://tools.ietf.org/html/rfc7519#section-4.1.2
const notBefore = "1ms";
const tokenDuration = 86400; // One day in epoch time

const tokenValidityValues = () => {
  const nowInEpochTime = Date.now().valueOf();
  return {
    iat: nowInEpochTime,
    exp: nowInEpochTime + tokenDuration
  };
};

const tokenOptions = {
  audience,
  issuer,
  algorithm
};

const issueToken = ({ email: sub }) => {
  // hNano ID Collision Calculator: https://zelark.github.io/nano-id-cc/
  const sessionToken = nanoId();
  const { iat, exp } = tokenValidityValues();
  const payload = {
    sub, // sub https://tools.ietf.org/html/rfc7519#section-4.1.2
    sessionToken,
    iat,
    exp
  };
  const jwtToken = jwt.sign(payload, secret, tokenOptions);
  return { jwtToken, payload };
};

const verifyJwtToken = jwtToken => jwt.verify(jwtToken, process.env.JWT_SECRET);

module.exports = {
  issueToken,
  verifyJwtToken
};
