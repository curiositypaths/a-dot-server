// const { apiRouterPrefix } = require("../routes/api");
// const { usersRouterPrefix } = require("../routes/users");

const {
  apiRouterPrefix,
  usersRouterPrefix,
  sessionsRouterPrefix
} = require("../routes/routePrefixes");

const METHODS = {
  POST: "POST",
  DELETE: "DELETE"
};

// These rule define the skip sessions authentication policy. Handle with care.
const skipSessionAuthenticationWhiteList = [
  { path: `${apiRouterPrefix}${usersRouterPrefix}`, method: METHODS.POST },
  { path: `${apiRouterPrefix}${sessionsRouterPrefix}`, method: METHODS.POST },
  { path: `${apiRouterPrefix}${sessionsRouterPrefix}`, method: METHODS.DELETE }
];

module.exports = { skipSessionAuthenticationWhiteList };
