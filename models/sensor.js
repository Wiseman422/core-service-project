'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var sensorSchema = new Schema({
  name: { type: String, required: true },
  manufacturer : { type: String, required: true, trim: true },
  device : { type: String, required: true, trim: true },
  deviceID : { type: String, required: true, trim: true },
  sensorTarget : { type: String, required: true, trim: true },
  interval : { type: String, required: true, trim: true },
  Latitude: { type: Number, required: true },
  Longitude: { type: Number, required: true },
  weatherStation : { type: String, required: true, trim: true },
  metrics: [{ type: Schema.Types.ObjectId, ref: 'metric', default: null }],
  creatorRole: { type: String, required: true }
});

sensorSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

sensorSchema.pre('save', function(next) {
  if (validationUtil.isCreratorRoleChanged(this)) {
    var err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('sensor', sensorSchema);
