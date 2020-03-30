'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var metricSchema = new Schema({
  metric: { type: String, required: true, trim: true },
  metricType: { type: String, required: true, trim: true },
  metricName: { type: String, default: null, trim: true },
  metricID: { type: String, default: null, trim: true },
  formula: { type: String, default: null, trim: true },

  creatorRole: { type: String, required: true }
});

metricSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

metricSchema.pre('save', function(next) {
  if (validationUtil.isCreratorRoleChanged(this)) {
    var err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('metric', metricSchema);
