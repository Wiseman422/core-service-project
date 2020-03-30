'use strict';

var AWS     = require('aws-sdk');
var async   = require('async');
var config  = require('../config');
var awsUtil = require('./util');

function sendObject(queueName, data, callback) {
  if (!queueName || !data) {
    var err = new Error('Please specify queue name and data object');
    return callback(err);
  }

  awsUtil.setCredentials(AWS);
  var sqs = new AWS.SQS();

  var instance = config.get('instance') || 'Default';

  async.waterfall([
    function(cb) {
      var params = {
        QueueName: queueName,
        Attributes: {
          DelaySeconds: '0'
        }
      };
      sqs.createQueue(params, cb);
    },
    function(queueParameters, cb) {
      data.instance = instance;
      var params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: queueParameters.QueueUrl,
        DelaySeconds: '0',
        MessageAttributes: {}
      };
      sqs.sendMessage(params, cb);
    }
  ], callback);
}

exports.sendObject = sendObject;
