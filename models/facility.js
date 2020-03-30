'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var facilitySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, default: null, trim: true },
  country: { type: String, default: null, trim: true },
  postalCode: { type: String, default: null, trim: true },
  state: { type: String, default: null, trim: true },
  street: { type: String, default: null, trim: true },

  taxID: { type: String, default: null, trim: true },
  nonProfit: { type: Boolean, default: null, trim: true },
  utilityProvider: { type: String, default: null, trim: true },
  utilityAccounts: { type: Array, default: [] },

  billingInterval: { type: Number, default: 30 },

  creatorRole: { type: String, required: true },
  dataLoggers: [{ type: Schema.Types.ObjectId, ref: 'dataLogger', default: null }]
});

facilitySchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

facilitySchema.pre('save', function(next) {
  if (validationUtil.isCreratorRoleChanged(this)) {
    var err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('facility', facilitySchema);
