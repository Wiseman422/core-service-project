'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var demouserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: consts.ALLOWED_USER_ROLES },
  creationTime: { type: Date, default: Date.now }
});

exports = mongoose.model('demouser', demouserSchema);
