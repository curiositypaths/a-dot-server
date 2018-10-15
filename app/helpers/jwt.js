var jwt = require("jsonwebtoken");
const nanoId = require("nanoid");

const secret = process.env.JWT_SECRET;

const algorithm = "HS256";
const expiresIn = "1hours"; // Change to 30 days
const audience = "http://web.adot.app"; // https://tools.ietf.org/html/rfc7519#section-4.1.3
const issuer = "http://api.adot.app"; // https://tools.ietf.org/html/rfc7519#section-4.1.1
// subject https://tools.ietf.org/html/rfc7519#section-4.1.2
const notBefore = "1ms";

const tokenOptions = {
  expiresIn,
  audience,
  issuer,
  notBefore,
  algorithm
};

const issueToken = sub => {
  // hNano ID Collision Calculator: https://zelark.github.io/nano-id-cc/
  const sessionToken = nanoId();
  const payload = {
    sub, // sub https://tools.ietf.org/html/rfc7519#section-4.1.2
    sessionToken
  };
  const jwtToken = jwt.sign(payload, secret, tokenOptions);
  return jwtToken;
};

const parseJwtToken = jwtToken => jwt.verify(jwtToken, process.env.JWT_SECRET);

module.exports = {
  issueToken,
  parseJwtToken
};
