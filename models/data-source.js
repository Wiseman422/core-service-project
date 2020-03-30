'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var validationUtil = require('../util/validation-util');
var errorUtil      = require('../util/error-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var dataSourceSchema = new Schema({
  name: { type: String, required: true },
  dataSourceType: { type: String, required: true, enum: consts.DATA_SOURCE_TYPES }, // TODO: undefined

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

  manufacturer : { type: String, default: null, trim: true },
  device : { type: String, default: null, trim: true },
  deviceID : { type: String, default: null, trim: true },
  accessMethod : { type: String, default: null, trim: true },
  destination : { type: String, default: null, trim: true },
  interval : { type: String, default: null, trim: true },
  webAddress : { type: String, default: null, trim: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  weatherStation : { type: String, default: null, trim: true },
  endDate: { type: Date, default: null },
  enphaseUserId: { type: String, default: null, trim: true },

  sensorTarget : { type: String, default: null, trim: true },

  metric: { type: String, default: null, trim: true },
  metricType: { type: String, default: null, trim: true },
  summaryMethod: { type: String, enum: consts.SUMMARY_METHOD_TYPES },

  metricID: { type: String, default: null, trim: true },
  formula: { type: String, default: null, trim: true },

  parents: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    tag: { type: String, required: true, trim: true}
  }],
  children: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    tag: { type: String, required: true, trim: true}
  }],

  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  creatorRole: { type: String, required: true }
});

dataSourceSchema.path('creator').set(function(newValue) {
  this.previousCreator = this.creator;
  return newValue;
});

dataSourceSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

dataSourceSchema.path('dataSourceType').set(function(newValue) {
  this.previousDataSourceType = this.dataSourceType;
  return newValue;
});

dataSourceSchema.pre('save', function(next) {
  var err;
  if (validationUtil.isCreatorChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR);
    return next(err);
  }
  if (validationUtil.isCreratorRoleChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  if (validationUtil.isDataSourceTypeChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_DATA_SOURCE_TYPE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('datasource', dataSourceSchema);
