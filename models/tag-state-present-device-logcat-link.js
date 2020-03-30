'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStatePresentDeviceLogcatLinkSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  link: { type: String, default: null, trim: true },
  uploadTime: { type: String, default: null }
});

exports = mongoose.model('presentDeviceLogcatLink', tagStatePresentDeviceLogcatLinkSchema, 'tagstates');
