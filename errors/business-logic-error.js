'use strict';

function BusinessLogicError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'BusinessLogicError';
}

BusinessLogicError.prototype = new Error();

module.exports = BusinessLogicError;
