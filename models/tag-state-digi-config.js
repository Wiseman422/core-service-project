'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateDigiConfigSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  PANID: { type: String, required: true, trim: true }, // TODO: fix case
  NJ_TIME: { type: Number, default: null }, // TODO: fix case
  DATA_REPORT_INTERVAL: { type: Number, default: null } // TODO: fix case
});

exports = mongoose.model('digiConfig', tagStateDigiConfigSchema, 'tagstates');
