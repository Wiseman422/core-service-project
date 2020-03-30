'use strict';

function UnprocessableRequestError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'UnprocessableRequestError';
}

UnprocessableRequestError.prototype = new Error();

module.exports = UnprocessableRequestError;
