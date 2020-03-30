'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateDigiEventLogSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  logUrl: { type: String, required: true, trim: true },
  uploadTime: { type: String, default: null, trim: true }
});

exports = mongoose.model('digiEventLog', tagStateDigiEventLogSchema, 'tagstates');
