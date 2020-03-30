'use strict';

function DuplicateObjectError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'DuplicateObjectError';
}

DuplicateObjectError.prototype = new Error();

module.exports = DuplicateObjectError;
