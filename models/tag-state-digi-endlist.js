'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateDigiEndListSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  GEM: [{ // TODO: fix case
    _id:false,
    'mac_address': { type: String, required: true, trim: true }
  }],
  Thermostat: [{
    _id:false,
    'mac_address': { type: String, required: true, trim: true }
  }]
});

exports = mongoose.model('digiEndList', tagStateDigiEndListSchema, 'tagstates');
