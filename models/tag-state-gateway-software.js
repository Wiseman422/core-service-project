'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateGatewaySoftwareSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  status: { type: String, required: true, trim: true },
  softwareVersion : { type: String, required: true, trim: true },
  upgradeTime : { type: Date, required: true }
});

exports = mongoose.model('gatewaySoftware', tagStateGatewaySoftwareSchema, 'tagstates');
