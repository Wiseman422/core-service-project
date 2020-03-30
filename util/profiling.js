'use strict';

var moment = require('moment');
var config = require('../config');
var log    = require('./logger');

var ids = {};
var startingId = 0;

var TimeProfiler = function(initPrefix) {
  this.initPrefix = initPrefix;
};

TimeProfiler.prototype._getLabel = function(id) {
  var label = 'profiling.';
  if (this.initPrefix) {
    label += this.initPrefix + '.';
  }
  label += id;
  return label;
};

TimeProfiler.prototype.generateId = function() {
  startingId += 1;
  return startingId;
};

TimeProfiler.prototype.start = function(id) {
  var label  = this._getLabel(id);
  ids[label] = moment();
};

TimeProfiler.prototype.endTime = function(id) {
  var label  = this._getLabel(id);
  var diff = this.getTime(id);
  log.info(label + ' ' + diff);
};

TimeProfiler.prototype.getTime = function(id) {
  var label = this._getLabel(id);
  var startTime = ids[label];
  if (!startTime) {
    return log.error('Profiling response time error: no such label: ' + label);
  }

  var diff = moment() - startTime;
  delete ids[id];
  return diff;
};

TimeProfiler.prototype.createScope = function(id) {
  var newPrefix = this.initPrefix ? this.initPrefix + '.' : '';
  newPrefix += id;

  return new TimeProfiler(newPrefix);
};

module.exports = function(id) {
  if (!config.get('time_profiling_enable')) {
    var FakeProfiler = function() {};
    FakeProfiler.prototype.start = function() {};
    FakeProfiler.prototype.endTime = function() {};
    FakeProfiler.prototype.getTime = function() {};
    FakeProfiler.prototype.createScope = function() { return new FakeProfiler(); };
    FakeProfiler.prototype.generateId = function() { return '0'; };
    return new FakeProfiler();
  }

  return new TimeProfiler(id);
};
