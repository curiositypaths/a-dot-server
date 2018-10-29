const create = ({ user, jwtToken }) => {
  const { firstName, lastName, email } = user;
  const userDataToIncludeInResponse = { firstName, lastName, email };
  return { jwtToken, user: userDataToIncludeInResponse };
};

module.exports = {
  create
};
