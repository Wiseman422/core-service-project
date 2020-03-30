'use strict';

var AWS     = require('aws-sdk');
var config  = require('../config');
var awsUtil = require('./util');

function getParams(companyName, isCreate) {
  return {
    ChangeBatch: {
      Changes: [
        {
          Action: isCreate? 'CREATE' : 'DELETE',
          ResourceRecordSet: {
            Name: companyName + config.get('aws:route53:resourcerecordsetbasename'),
            Type: 'CNAME',
            ResourceRecords: [
              {
                Value: config.get('aws:route53:resourcerecordvalue')
              }
            ],
            TTL: 60
          }
        }
      ]
    },
    HostedZoneId: config.get('aws:route53:hostedzoneid')
  };
}

function addCNAME(companyName, callback) {
  awsUtil.setCredentials(AWS);

  var route53 = new AWS.Route53();
  var params = getParams(companyName, true);
  route53.changeResourceRecordSets(params, callback);
}

function deleteCNAME(companyName, callback) {
  awsUtil.setCredentials(AWS);

  var route53 = new AWS.Route53();
  var params = getParams(companyName, false);
  route53.changeResourceRecordSets(params, callback);
}

exports.addCNAME = addCNAME;
exports.deleteCNAME = deleteCNAME;
