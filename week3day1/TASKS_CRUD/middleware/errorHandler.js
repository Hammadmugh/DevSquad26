const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message,
      });
      break;
    default:
      console.log("No error found");
      break;
  }
};

module.exports = errorHandler;
