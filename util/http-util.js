'use strict';

var errorUtil = require('./error-util');

exports.processError = function(err, res, next) {
  /* jshint maxstatements: false */
  if (arguments.length !== 3) {
    // The exceptional case - we must terminate app
    throw new Error('Invalid processError call. Must be called with err, res, next parameters');
  }

  var resStatus;
  if (errorUtil.isUnauthorizedRequestError(err)) {
    resStatus = 401;
  } else if (errorUtil.isAccessDeniedError(err)) {
    resStatus = 403;
  } else if (errorUtil.isObjectNotFoundError(err)) {
    resStatus = 404;
  } else if (errorUtil.isDuplicateObjectError(err)) {
    resStatus = 409;
  } else if (errorUtil.isObjectValidationError(err)) {
    resStatus = 422;
  } else if (errorUtil.isUnprocessableRequestError(err)) {
    resStatus = 422;
  } else if (errorUtil.isBusinessLogicError(err)) {
    resStatus = 422;
  } else if (errorUtil.isThirdPartyServiceError(err)) {
    resStatus = 423;
  }

  if (resStatus) {
    var data = {
      success: 0,
      message: err.message,
      info: err.info
    };
    res.status(resStatus).send(data);
  } else {
    next(err);
  }
};

exports.sendSuccessResponse = function(message, res) {
  var data = {
    success: 1,
    message: message
  };
  res.send(data);
};
