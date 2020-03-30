'use strict';

function AccessDeniedError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'AccessDeniedError';
}

AccessDeniedError.prototype = new Error();

module.exports = AccessDeniedError;
