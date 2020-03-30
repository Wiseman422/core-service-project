'use strict';

function ThirdPartyServiceError(msg, info) {
  this.message = msg;
  this.info = info;
  this.name = 'ThirdPartyServiceError';
}

ThirdPartyServiceError.prototype = new Error();

module.exports = ThirdPartyServiceError;
