'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateThermostatTemperatureSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  status: { type: String, required: true, trim: true },
  heatSetpoint: { type: Number, required: true },
  coolSetpoint: { type: Number, required: true },
  ts: { type: Date, required: true },
  errorCode : { type: Number, required: true },
  description: { type: String, default: null, trim: true }
});

exports = mongoose.model('thermostatTemperature', tagStateThermostatTemperatureSchema, 'tagstates');
