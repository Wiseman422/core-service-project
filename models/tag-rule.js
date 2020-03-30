'use strict';

var mongoose       = require('mongoose');
var consts         = require('../consts');
var errorUtil      = require('../util/error-util');
var validationUtil = require('../util/validation-util');
var Schema         = mongoose.Schema;

const TAG_ERRORS = consts.SERVER_ERRORS.TAG;

var tagRuleSchema = new Schema({
  tagType: { type: String, required: true },
  allowedChildrenTagTypes: { type: Array, default: [] },
  allowedParentTagTypes: { type: Array, default: [] },
  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  creatorRole: { type: String, required: true }
});

tagRuleSchema.path('tagType').set(function(newValue) {
  this.previousTagType = this.tagType;
  return newValue;
});

tagRuleSchema.pre('save', function(next) {
  if (validationUtil.isTagTypeChanged(this)) {
    var err = errorUtil.getDbValidationError(TAG_ERRORS.RULE.CAN_NOT_CHANGE_RULE_TYPE);
    return next(err);
  }
  return next();
});

exports = mongoose.model('tagrule', tagRuleSchema);
