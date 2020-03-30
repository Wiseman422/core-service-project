'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sessionSchema = new Schema({
  session: { type: String, required: true },
  expires: { type: Date, required: true }
});

exports = mongoose.model('session', sessionSchema);
