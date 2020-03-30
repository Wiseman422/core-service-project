'use strict';

var _     = require('lodash');
var nconf = require('nconf');
var conts = require('./consts');

function _convertKeysLoLowerCase(obj) {
  _.each(obj, function(value, key) {
    delete obj[key];
    key = key.toLowerCase();
    obj[key] = value;

    if (_.isObject(value) && !_.isArray(value)) {
      _convertKeysLoLowerCase(value);
    }
  });

  return obj;
}

exports.get = (key) => {
  /* jshint maxstatements: false */
  if (!key) {
    throw new Error(`Key is undefined`);
  }
  var value = nconf.get(key.toUpperCase());
  if (_.isUndefined(value)) {
    value = nconf.get(key);
    if (_.isUndefined(value)) {
      return undefined;
    }
  }
  if (_.isNumber(value) || _.isBoolean(value) || _.isArray(value)) {
    return value;
  }
  if (_.isObject(value)) {
    return _convertKeysLoLowerCase(value);
  }
  if (value.match(/^\d$/g)) {
    return parseInt(value);
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return value;
};

exports.init = requestedSubSrvcs => {
  const avaliableSubSrvcs = _.keys(conts.CONFIG_KEYS);

  _.each(requestedSubSrvcs, subSrvc => {
    const subSrvcName = subSrvc.toUpperCase();
    if (!_.includes(avaliableSubSrvcs, subSrvcName)) {
      throw new Error(`Invalid sub-service: ${subSrvc}`);
    }

    const srvcKeys = conts.CONFIG_KEYS[subSrvcName];
    _.each(srvcKeys, key => {
      var value = exports.get(key);
      if (_.isUndefined(value)) {
        throw new Error(`Config doesn't contain required key: ${key}`);
      }
    });
  });
};
