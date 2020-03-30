'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var deviceLogSchema = new Schema({
  timestamp: { type: String, required: true },
  count: { type: Number, default: null },
  ethernatStatus: { type: String, default: null, trim: true },
  wifiStatus: { type: String, default: null, trim: true },
  memUsage: { type: Number, default: null },
  wsTrigger: { type: Number, default: null },
  totalUpTime: { type: Number, default: null },
  deviceId: { type: String, trim: true, required: true },
  version: { type: String, default: null, trim: true }
});

exports = mongoose.model('presentDeviceLog', deviceLogSchema);
