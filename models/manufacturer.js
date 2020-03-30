'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var manufacturerSchema = new Schema({
  name: { type: String, required: true }
});

exports = mongoose.model('manufacturer', manufacturerSchema);
