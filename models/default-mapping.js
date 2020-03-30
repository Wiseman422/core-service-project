'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var defaultMappingSchema = new Schema({
  type: { type: String, required: true, trim: true },
  target: { type: String, required: true, trim: true },
  formula: { type: Schema.Types.Mixed, required: true }
});

exports = mongoose.model('defaultMapping', defaultMappingSchema);
