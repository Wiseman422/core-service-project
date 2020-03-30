'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStatePresentDeviceStatusSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  timestamp: { type: String, default: null },
  count: { type: Number, default: null },
  ethernetStatus: { type: String, default: null, trim: true },
  wifiStatus: { type: String, default: null, trim: true },
  memUsage: { type: Number, default: null },
  wsTrigger: { type: Number, default: null },
  totalUpTime: { type: Number, default: null },
  version: { type: String, default: null, trim: true }
});

exports = mongoose.model('presentDeviceStatus', tagStatePresentDeviceStatusSchema, 'tagstates');
