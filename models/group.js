'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;

var groupSchema = new Schema({
  name:  {type: String, required: true },
  information: { type: String, required: false },
  children: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, required: true },
    name : { type: String, required: false },
    sourceType: { type: String, required: true, trim: true }
  }],
  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  creatorRole: { type: String, required: true },
  usersWithAccess: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, ref: 'user', required: true }
  }]
});

groupSchema.path('creator').set(function(newValue) {
  this.previousCreator = this.creator;
  return newValue;
});

groupSchema.path('creatorRole').set(function(newValue) {
  this.previousCreatorRole = this.creatorRole;
  return newValue;
});

groupSchema.pre('save', function(next) {
  var err;
  if (validationUtil.isCreatorChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR);
    return next(err);
  }
  if (validationUtil.isCreratorRoleChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_CREATOR_ROLE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('group', groupSchema);
