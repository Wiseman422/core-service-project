'use strict';

var crypto     = require('crypto');
var moment     = require('moment');
var cache      = require('./');
var commonUtil = require('../util/common-util');

function getCachedElementData(elementKey, defaultCachedData, callback) {
  cache.get(elementKey, function(err, result) {
    if (err) {
      return callback(err);
    }
    if (result) {
      callback(null, JSON.parse(result));
    } else {
      callback(null, defaultCachedData);
    }
  });
}

function setElementData(elementHash, ttl, data, callback) {
  cache.setex(elementHash, ttl, JSON.stringify(data), callback);
}

function setElementDataInfinite(elementHash, data, callback) {
  cache.set(elementHash, JSON.stringify(data), callback);
}

function getWildCardAppEntityCacheKey(entityId) {
  return entityId + '*';
}

function deleteSingleAppEntityCache(entityId, callback) {
  var appEntityKey = getWildCardAppEntityCacheKey(entityId);
  cache.delWildcardKey(appEntityKey, callback);
}

function deleteAppEntityWidgetCache(entityId, widgetId, callback) {
  cache.del(entityId + ':' + widgetId, callback);
}

function getHashByElementParameters(params) {
  return crypto.createHash('md5')
    .update(JSON.stringify(params))
    .digest('hex');
}

function getCachedEndDate(cacheResult) {
  var cachedEndDate = null;
  if (cacheResult && cacheResult.dataPoints && cacheResult.dataPoints.length > 0) {
    var ts = cacheResult.dataPoints[cacheResult.dataPoints.length - 1].ts;
    cachedEndDate = moment.utc(ts);

    // remove last date from cached result, because we will reload that date from tempoiq
    commonUtil.removeDuplicateTempoIQDates([cacheResult], cachedEndDate);
  }

  return cachedEndDate;
}

function pushArrayItem(key, item, callback) {
  cache.rpush(key, JSON.stringify(item), callback);
}

function getArray(key, callback) {
  cache.lrange(key, 0, -1, function(err, data) {
    if (err) {
      return callback(err);
    }

    for (var i=0; i < data.length; i++) {
      data[i] = JSON.parse(data[i]);
    }

    return callback(null, data);
  });
}

function delSingleKey(key, callback) {
  cache.del(key, callback);
}

module.exports = {
  getCachedElementData: getCachedElementData,
  setElementData: setElementData,
  deleteSingleAppEntityCache: deleteSingleAppEntityCache,
  deleteAppEntityWidgetCache: deleteAppEntityWidgetCache,
  getHashByElementParameters: getHashByElementParameters,
  getCachedEndDate: getCachedEndDate,
  setElementDataInfinite: setElementDataInfinite,
  pushArrayItem: pushArrayItem,
  getArray: getArray,
  delSingleKey: delSingleKey
};
