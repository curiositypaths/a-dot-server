module.exports.generateSessionParams = (
  { id: UserId },
  { sessionToken, iat: issuedAt, exp: expiresAt }
) => ({
  UserId,
  sessionToken,
  issuedAt,
  expiresAt
});
