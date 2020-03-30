'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var deviceSchema = new Schema({
  name: { type: String, required: true }
});

exports = mongoose.model('device', deviceSchema);
