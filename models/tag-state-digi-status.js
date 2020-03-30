'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateDigiStatusSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  dateTime: { type: String, default: null, trim: true },
  devices: [{
    _id:false,
    'mac_address': { type: String, required: true, trim: true },
    'device_type': { type: String, required: true, trim: true }
  }],
  internetConnectivity: { type: String, default: null, trim: true },
  gemDataReportingStatus: { type: String, default: null, trim: true },
  gemLastReportTime: { type: String, default: null, trim: true },
  thermostatDataReportingStatus: { type: String, default: null, trim: true },
  thermostatLastReportTime: { type: String, default: null, trim: true }
});

exports = mongoose.model('digiStatus', tagStateDigiStatusSchema, 'tagstates');
