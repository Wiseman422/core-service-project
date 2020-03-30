'use strict';

var mongoose   = require('mongoose');
var requireDir = require('require-dir');
var Promise    = require('bluebird');
var config     = require('../config');
var log        = require('../util/logger');

var connection = mongoose.connection;

/* istanbul ignore next */
connection.on('error', function(err) {
  log.error('Database connection error', err);
});

connection.on('connected', function() {
  log.info('Connected to database');
});

connection.on('disconnected', function() {
  log.info('Disconnected from database');
});

module.exports = {
  connection: connection,

  models: requireDir('../models'),

  connect: function() {
    log.info('Using database:', config.get('db:connection'));

    var connect = Promise.promisify(mongoose.connect, { context: mongoose });
    return connect(config.get('db:connection'), config.get('db:options'));
  },

  disconnect: function() {
    var connClose = Promise.promisify(connection.close, { context: connection });
    return connClose();
  }
};
