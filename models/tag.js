'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var validationUtil = require('../util/validation-util');
var errorUtil      = require('../util/error-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;
const TAG_ERRORS = consts.SERVER_ERRORS.TAG;

var tagSchema = new Schema({
  name: { type: String, required: true },
  tagType: { type: String, required: true, enum: consts.TAG_TYPES },
  displayName: { type: String },

  region: { type: String, default: null, trim: true },
  continent: { type: String, default: null, trim: true },
  city: { type: String, default: null, trim: true },
  country: { type: String, default: null, trim: true },
  postalCode: { type: String, default: null, trim: true },
  state: { type: String, default: null, trim: true },
  street: { type: String, default: null, trim: true },
  address: { type: String, default: null, trim: true },

  taxID: { type: String, default: null, trim: true },
  nonProfit: { type: Boolean, default: null, trim: true },
  utilityProvider: { type: String, default: null, trim: true },
  utilityAccounts: { type: Array, default: [] },

  billingInterval: { type: Number, default: 30 },
  image: { type: String, default: null, trim: true },
  constEmissionFactor: { type: Number, default: null, min: 0 },

  manufacturer: { type: String, default: null, trim: true },
  device: { type: String, default: null, trim: true },
  deviceID: { type: String, default: null, trim: true },
  accessMethod: { type: String, default: null, trim: true },
  destination: { type: String, default: null, trim: true },
  interval: { type: String, default: null, trim: true },
  webAddress: { type: String, default: null, trim: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  weatherStation : { type: String, default: null, trim: true },
  endDate: { type: Date, default: null },
  enphaseUserId: { type: String, default: null, trim: true },
  timezone: { type: String, default: null, trim: true },
  dateTimeFormat: { type: String, default: null, trim: true },
  username: { type: String, default: null, trim: true },
  password: { type: String, default: null, trim: true },

  sensorTarget: { type: String, default: null, trim: true },

  rate: { type: Number, default: null },
  metric: { type: String, default: null, trim: true },
  metricType: { type: String, default: null, trim: true },
  metricID: { type: String, default: null, trim: true },
  formula: { type: String, default: null, trim: true },
  summaryMethod: { type: String, default: null, trim: true },
  datacoreMetricID: { type: String, default: null, trim: true },
  externalId: { type: String, default: null, trim: true },

  parents: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    tagType: { type: String, required: true, trim: true }
  }],
  children: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    tagType: { type: String, required: true, trim: true }
  }],
  appEntities: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    appName: { type: String, required: true, trim: true }
  }],
  usersWithAccess: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, ref: 'user', required: true }
  }],

  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  creatorRole: { type: String, required: true },
  bpLock: { type: Boolean, default:false, trim: true },
  nodeType: { type: String, default: null, trim: true },
  potentialPower: { type: Number, default: null, trim: true },
  commissioningDate: { type: Date, default: null },

  deviceSoftware: [{
    _id:false,
    bucketName: { type: String, required: true, trim: true },
    version: { type: String, required: true, trim: true },
    uploadedDate: { type: Date, default: null }
  }],

  fake: { type: Boolean, default:false },

  installCity: { type: String, default: null, trim: true },
  installCountry: { type: String, default: null, trim: true },
  installPostalCode: { type: String, default: null, trim: true },
  installState: { type: String, default: null, trim: true },
  installStreet: { type: String, default: null, trim: true },
  installAddress: { type: String, default: null, trim: true },

  creationTime: { type: Date, default: Date.now },
  isActive: { type: Boolean, default:true },
  hasAuth: { type: Boolean, default:false }
});

tagSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

tagSchema.path('creator').set(function(newValue) {
  this.previousCreator = this.creator;
  return newValue;
});

tagSchema.path('tagType').set(function(newValue) {
  this.previousTagType = this.tagType;
  return newValue;
});

tagSchema.pre('save', function(next) {
  /* jshint maxstatements: false */
  var err;

  if (validationUtil.isCreatorChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR);
    return next(err);
  }
  if (validationUtil.isCreratorRoleChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  if (validationUtil.isTagTypeChanged(this)) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.CAN_NOT_CHANGE_TAG_TYPE);
    return next(err);
  }
  if (this.tagType === consts.TAG_TYPE.Metric &&
    consts.ALLOWED_METRICS_SUMMARY_METHODS.indexOf(this.summaryMethod) === -1) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.NOT_ALLOWED_SUMMARY_METHOD);
    return next(err);
  }
  if (this.tagType === consts.TAG_TYPE.Node && this.nodeType &&
    consts.NODE_TYPES.indexOf(this.nodeType) === -1) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.NOT_ALLOWED_NODE_TYPE);
    return next(err);
  }
  if (this.tagType === consts.TAG_TYPE.Scope && this.hasAuth && (!this.username || !this.password)) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.SCOPE_USES_AUTH);
    return next(err);
  }
  if (this.dateTimeFormat && consts.ALLOWED_DATE_TIME_FORMAT.indexOf(this.dateTimeFormat) === -1) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.NOT_ALLOWED_DATE_TIME_FORMAT);
    return next(err);
  }
  return next();
});

exports = mongoose.model('tag', tagSchema);
