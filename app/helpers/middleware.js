const syncReqBodyLogger = (req, res, next) => {
  console.log("The request body is, ", req.body);
  next();
};

module.exports = {
  syncReqBodyLogger
};
