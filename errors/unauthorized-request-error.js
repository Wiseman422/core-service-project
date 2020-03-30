'use strict';

function UnauthorizedRequestError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'UnauthorizedRequestError';
}

UnauthorizedRequestError.prototype = new Error();

module.exports = UnauthorizedRequestError;
