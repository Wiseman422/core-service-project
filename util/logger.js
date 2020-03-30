'use strict';

var winston = require('winston');
var config  = require('../config');

module.exports = {
  logger: null,

  init: function() {
    this.logger = winston.loggers.add('default', config.get('winston:transports'));
  },

  tryInitLogger: function() {
    if (!this.logger) {
      this.init();
    }
  },

  silly: function() {
    this.tryInitLogger();
    return this.logger.silly.apply(this.logger, arguments);
  },
  debug: function() {
    this.tryInitLogger();
    return this.logger.debug.apply(this.logger, arguments);
  },
  verbose: function() {
    this.tryInitLogger();
    return this.logger.verbose.apply(this.logger, arguments);
  },
  info: function() {
    this.tryInitLogger();
    return this.logger.info.apply(this.logger, arguments);
  },
  warn: function() {
    this.tryInitLogger();
    return this.logger.warn.apply(this.logger, arguments);
  },
  error: function() {
    this.tryInitLogger();
    return this.logger.error.apply(this.logger, arguments);
  }
};
