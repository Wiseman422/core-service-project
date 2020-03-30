'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var validationUtil = require('../util/validation-util');
var errorUtil      = require('../util/error-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;
const TAG_ERRORS = consts.SERVER_ERRORS.TAG;

var tagScheduleSchema = new Schema({
  weekDays: { type: Array, default: [] },
  fromHour: {type: Number, required: true },
  fromMinute: { type: Number, required: true },
  toHour: { type: Number, required: true },
  toMinute: { type: Number, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },
  heatSetpoint: { type: Number, required: true },
  coolSetpoint: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  creatorRole: { type: String, required: true },
  isActive: { type: Boolean, default:true }
});

tagScheduleSchema.path('fromHour').validate(function(value) {
  return value >= 0 && value <= 23 && validationUtil.isWholeNumber(value);
}, 'Invalid from hour');

tagScheduleSchema.path('toHour').validate(function(value) {
  return value >= 0 && value <= 23 && validationUtil.isWholeNumber(value);
}, 'Invalid to hour');

tagScheduleSchema.path('fromMinute').validate(function(value) {
  return value >= 0 && value <= 59 && validationUtil.isWholeNumber(value);
}, 'Invalid from minute');

tagScheduleSchema.path('toMinute').validate(function(value) {
  return value >= 0 && value <= 59 && validationUtil.isWholeNumber(value);
}, 'Invalid to minute');

tagScheduleSchema.path('weekDays').validate(function(value) {
  for (var i = 0; i < value.length; i++) {
    if (value[i] < 1 || value[i] > 7 || !validationUtil.isWholeNumber(value[i])) {
      return false;
    }
  }
  return true;
}, 'Invalid week day');

tagScheduleSchema.path('creator').set(function(newValue) {
  this.previousCreator = this.creator;
  return newValue;
});

tagScheduleSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

tagScheduleSchema.pre('save', function(next) {
  var err;
  if (validationUtil.isCreatorChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR);
    return next(err);
  }
  if (validationUtil.isCreratorRoleChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  if (this.fromHour === this.toHour && this.fromMinute >= this.toMinute) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.SCHEDULE.FROM_SHOULD_BE_LESS_TO);
    return next(err);
  }
  if (this.heatSetpoint >= this.coolSetpoint) {
    err = errorUtil.getDbValidationError(TAG_ERRORS.SCHEDULE.MIN_IS_MORE_OR_EQUAL_MAX);
    return next(err);
  }
  return next();
});

exports = mongoose.model('tagschedule', tagScheduleSchema);
