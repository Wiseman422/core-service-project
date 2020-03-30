'use strict';

var redis   = require('redis');
var zlib    = require('zlib');
var Promise = require('bluebird');
var config  = require('../config');
var log     = require('../util/logger');
require('redis-scanstreams')(redis);

// TODO: test
redis.RedisClient.prototype.getWildCardKeys = function(key) {
  var keys = [];

  var stream = this.scan({
    pattern: key,
    count: 1000
  });

  return new Promise(function(resolve, reject) {
    stream.on('data', function(chunk) {
      keys.push(chunk);
    });

    stream.on('error', function(err) {
      reject(err);
    });

    stream.on('end', function() {
      resolve(keys);
    });
  });
};

// TODO: test
redis.RedisClient.prototype.delMultipleKeys = function(keys) {
  return Promise
    .each(keys, function(row) {
      return this.delAsync(row);
    })
    .catch(function(err) {
      err.name = 'RedisError';
      log.error(err);
    });
};

// TODO: test
redis.RedisClient.prototype.delWildcardKey = function(key) {
  return this
    .getWildCardKeys(key)
    .then(function(keys) {
      return this.delMultipleKeys(keys);
    })
    .catch(function(err) {
      err.name = 'RedisError';
      log.error(err);
    });
};

function _getKey(key) {
  var isCompressingEnabled = config.get('redis:compressing');
  if (isCompressingEnabled) {
    return key + config.get('redis:compressedkey');
  }
  return key;
}

function _getValue(cachedValue, callback) {
  var isCompressingEnabled = config.get('redis:compressing');
  if (cachedValue && isCompressingEnabled) {
    var compressedBuffer = new Buffer(cachedValue, 'base64');
    zlib.unzip(compressedBuffer, function(err, uncompressedBuffer) {
      if (err) { return callback(err); }
      var uncompressedValue = uncompressedBuffer ? uncompressedBuffer.toString() : null;
      callback(null, uncompressedValue);
    });
  } else {
    callback(null, cachedValue);
  }
}

function _setValue(key, value, callback) {
  key = _getKey(key);
  
  var isCompressingEnabled = config.get('redis:compressing');
  if (!isCompressingEnabled) {
    callback(null, key, value);
  } else {
    zlib.gzip(value, function(err, compressedValue) {
      if (err) { return callback(err); }
      var compressedBuffer = new Buffer(compressedValue);
      callback(null, key, compressedBuffer.toString('base64'));
    });
  }
}

redis.RedisClient.prototype.originalGet = redis.RedisClient.prototype.get;
redis.RedisClient.prototype.get = function(key, callback) {
  key = _getKey(key);
  
  this.originalGet(key, function(err, value) {
    if (err) { return callback(err); }
    _getValue(value, callback);
  });
};

redis.RedisClient.prototype.originalHget = redis.RedisClient.prototype.hget;
redis.RedisClient.prototype.hget = function(key, field, callback) {
  key = _getKey(key);
  
  this.originalHget(key, field, function(err, value) {
    if (err) { return callback(err); }
    _getValue(value, callback);
  });
};

redis.RedisClient.prototype.originalHgetall = redis.RedisClient.prototype.hgetall;
redis.RedisClient.prototype.hgetall = function(key, callback) {
  key = _getKey(key);
  
  this.originalHgetall(key, function(err, value) {
    if (err) { return callback(err); }
    _getValue(value, callback);
  });
};

redis.RedisClient.prototype.originalSet = redis.RedisClient.prototype.set;
redis.RedisClient.prototype.set = function(key, value, callback) {
  var self = this;
  
  _setValue(key, value, function(err, newKey, newValue) {
    if (err) { return callback(err); }
    self.originalSet(newKey, newValue, callback);
  });
};

redis.RedisClient.prototype.originalSetex = redis.RedisClient.prototype.setex;
redis.RedisClient.prototype.setex = function(key, expired, value, callback) {
  var self = this;
  
  _setValue(key, value, function(err, newKey, newValue) {
    if (err) { return callback(err); }
    self.originalSetex(newKey, expired, newValue, callback);
  });
};

redis.RedisClient.prototype.originalHset = redis.RedisClient.prototype.hset;
redis.RedisClient.prototype.hset = function(key, field, value, callback) {
  var self = this;
  
  _setValue(key, value, function(err, newKey, newValue) {
    if (err) { return callback(err); }
    self.originalHset(newKey, field, newValue, callback);
  });
};

module.exports = {
  client: null,

  connect: function() {
    log.info('Using redis:', config.get('redis'));

    this.client = redis.createClient(config.get('redis:port'), config.get('redis:host'));
    this.client.on('error', function(err) {
      err.name = 'RedisError';
      log.error(err);
    });

    Promise.promisifyAll(this.client);
    return Promise.resolve();
  },

  disconnect: function() {
    this.client.endAsync(true);
  }
};
