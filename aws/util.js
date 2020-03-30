'use strict';

var config = require('../config');

exports.setCredentials = function(AWS) {
  AWS.config.update({
    accessKeyId: config.get('aws:auth:accesskeyid'),
    secretAccessKey: config.get('aws:auth:secretaccesskey'),
    region: config.get('aws:auth:region')
  });
};

exports.searchThumbnailURL = function(searchKey) {
  if (searchKey.indexOf('/thumb/') !== -1) {
    return '';
  }

  var keys = searchKey.split('/');
  var lastKey = keys[keys.length - 1];
  if (lastKey.indexOf('thumb_') === 0) {
    return '';
  }

  if (keys[keys.length - 2] && keys[keys.length - 2] === 'thumb') {
    return '';
  }

  keys[keys.length - 1] = 'thumb';
  keys.push('thumb_' + lastKey);
  return keys.join('/');
};

exports.getFileNameFromKey = function(key) {
  var keys = key.split('/');
  var lastKey = keys[keys.length - 1];

  return lastKey;
};
