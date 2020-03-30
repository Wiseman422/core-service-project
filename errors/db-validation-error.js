'use strict';

function DbValidationError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'DbValidationError';
}

DbValidationError.prototype = new Error();

module.exports = DbValidationError;
