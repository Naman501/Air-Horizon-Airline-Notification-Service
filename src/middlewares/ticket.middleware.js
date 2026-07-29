const { StatusCodes } = require("http-status-codes");

const { errorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

function validateCreateRequest(req, res, next) {
  if (!req.body.subject) {
    errorResponse.message = "something went wrong while creating ticket.";
    errorResponse.error = new AppError(
      ["The incoming request does not contain a valid subject."],
      StatusCodes.BAD_REQUEST,
    );

    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.content) {
    errorResponse.message = "something went wrong while creating ticket.";
    errorResponse.error = new AppError(
      ["The incoming request does not contain valid content."],
      StatusCodes.BAD_REQUEST,
    );

    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.recepientEmail) {
    errorResponse.message = "something went wrong while creating ticekt.";
    errorResponse.error = new AppError(
      ["The incoming request does not contain a valid recepientEmail."],
      StatusCodes.BAD_REQUEST,
    );

    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
