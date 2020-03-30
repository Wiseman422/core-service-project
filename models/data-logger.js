'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var dataLoggerSchema = new Schema({
  name: { type: String, required: true },
  manufacturer : { type: String, required: true, trim: true },
  device : { type: String, required: true, trim: true },
  deviceID : { type: String, required: true, trim: true },
  accessMethod : { type: String, required: true, trim: true },
  destination : { type: String, default: null, trim: true },
  interval : { type: String, required: true, trim: true },
  webAddress : { type: String, default: null, trim: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  weatherStation : { type: String, required: true, trim: true },
  creatorRole: { type: String, required: true },
  endDate: { type: Date, default: null },
  enphaseUserId: { type: String, default: null, trim: true },
  sensors: [{ type: Schema.Types.ObjectId, ref: 'sensor', default: null }]
});

dataLoggerSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

dataLoggerSchema.pre('save', function(next) {
  if (validationUtil.isCreratorRoleChanged(this)) {
    var err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('dataLogger', dataLoggerSchema);
