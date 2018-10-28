module.exports.generateSessionParams = (
  { id: userId },
  { sessionToken, iat: issuedAt, exp: expiresAt }
) => ({
  userId,
  sessionToken,
  issuedAt,
  expiresAt
});
