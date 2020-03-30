'use strict';

function ObjectNotFoundError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'ObjectNotFoundError';
}

ObjectNotFoundError.prototype = new Error();

module.exports = ObjectNotFoundError;
