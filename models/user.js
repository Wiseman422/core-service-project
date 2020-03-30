'use strict';

var _              = require('lodash');
var bcrypt         = require('bcryptjs');
var mongoose       = require('mongoose');
var Promise        = require('bluebird');
var consts         = require('../consts');
var validationUtil = require('../util/validation-util');
var errorUtil      = require('../util/error-util');
var Schema         = mongoose.Schema;

Promise.promisifyAll(bcrypt);

const GEN_ERRORS = consts.SERVER_ERRORS.GENERAL;
const USER_ERRORS = consts.SERVER_ERRORS.USER;

var userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  middleName: { type: String, default: '', trim: true },
  phone: { type: String, default: null, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  emailUser: { type: String, required: true, lowercase: true, trim: true },
  emailDomain: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, default: null, select: false },
  socialToken: { type: String, default: null, trim: true },
  enphaseUserId: { type: String, default: null, trim: true },
  tokens: { type: Array, default: [], select: false },
  role: { type: String, default: null, enum: consts.ALLOWED_USER_ROLES },
  lastEditedPresentation: { type: Schema.Types.ObjectId, ref: 'bv_presentation', default: null },
  previousEditedPresentation: { type: Schema.Types.ObjectId, ref: 'bv_presentation', default: null },
  lastEditedDashboardId: { type: Schema.Types.ObjectId, ref: 'ds_dashboard', default: null },
  previousEditedDashboardId: { type: Schema.Types.ObjectId, ref: 'ds_dashboard', default: null },
  previousPasswords: { type: Array, default: [], select: false },
  apps: { type: Array, default: [] },
  defaultApp: { type: String, default: null },
  sfdcContactId: { type: String, default: null },
  profilePictureUrl: { type: String, default: null },
  energyCapUserName: { type: String, default: null, trim: true },
  energyCapPassword: { type: String, default: null },
  energyCapDataSource: { type: String, default: null, trim: true },

  accessibleTags: [{
    _id:false,
    id : { type: Schema.Types.ObjectId, ref:'tag', required: true },
    tagType: { type: String, required: false, trim: true, enum: consts.TAG_TYPES }
  }],

  collections: [{
    _id: false,
    text: { type: String, default: null },
    dashboards: { type: Array, default: [] }
  }],

  accounts: [{ type: Schema.Types.ObjectId, ref: 'account', default: null }],

  creationTime: { type: Date, default: Date.now }
});

userSchema.path('role').set(function(newValue) {
  this.previousRole = this.role;
  return newValue;
});

userSchema.path('password').set(function(newValue) {
  this.previousPassword = this.password;
  return newValue;
});

/* TODO: use config in calling code
userSchema.virtual('sfdcContactURL').get(function() {
  if (this.sfdcContactId) {
    return config.get('salesforce:auth:url') + '/' + this.sfdcContactId.replace('Lead', '');
  }
  return null;
});
*/

userSchema.virtual('name').get(function() {
  if (this.middleName) {
    return this.firstName + ' ' + this.middleName + ' ' + this.lastName;
  }
  return this.firstName + ' ' + this.lastName;
});

userSchema.path('defaultApp').validate(function(defaultApp, respond) {
  respond(!defaultApp || consts.ALLOWED_APPS.indexOf(defaultApp) >= 0);
}, USER_ERRORS.NOT_ALLOWED_DEFAULT_APP);

userSchema.path('email').validate(function(email, respond) {
  mongoose.model('user')
    .findOne({ email: email, _id: { $ne: this._id } })
    .then((user) => {
      respond(!user);
    });
}, 'This email address is already registered');

userSchema.methods.getSalt = function(callback) {
  if (!this.previousPassword) {
    bcrypt.genSalt(10, callback);
  } else {
    callback(null, bcrypt.getSalt(this.previousPassword));
  }
};

userSchema.methods.isNewPassword = function(newHashedPassword) {
  return !_.includes(this.previousPasswords, newHashedPassword);
};

userSchema.methods.checkPassword = function(candidatePassword) {
  if (this.password && candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.password);
  }
  return false;
};

userSchema.pre('save', function(next) {
  var self = this;
  var err;

  if (validationUtil.isRoleChanged(this)) {
    err = errorUtil.getDbValidationError(GEN_ERRORS.CAN_NOT_CHANGE_USER_ROLE);
    return next(err);
  }

  // BP will have access to all data sources, so don't need manually specify data sources
  if (this.role === consts.USER_ROLES.BP) {
    this.apps = [];
  }

  if (!this.isModified('password')) {
    return next();
  }

  this.getSalt(function(saltErr, salt) {
    if (saltErr) {
      return next(saltErr);
    }
    bcrypt.hash(self.password, salt, function(hashErr, hash) {
      if (hashErr) {
        return next(hashErr);
      }
      if (self.isNewPassword(hash)) {
        self.password = hash;
        self.previousPasswords.push(hash);
        return next();
      }
      err = errorUtil.getDbValidationError(USER_ERRORS.PASSWORD_HAS_BEEN_USED);
      return next(err);
    });
  });
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

exports = mongoose.model('user', userSchema);
