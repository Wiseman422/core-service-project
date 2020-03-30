'use strict';

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var accountSchema = new Schema({
  name: { type: String, required: true, trim: true },
  awsAssetsKeyPrefix: { type: String, default: null },
  sfdcAccountId: { type: String, default: null, unique: true }, // TODO

  email: { type: String, default: null, trim: true },
  phone: { type: String, default: null, trim: true },
  webSite: { type: String, default: null, trim: true },
  dunsNumber: { type: String, default: null, trim: true },
  tickerSymbol: { type: String, default: null, trim: true },
  cname: { type: String, default: null, lowercase: true, trim: true },

  billingAddress: { type: String, default: null, trim: true },
  billingCity: { type: String, default: null, trim: true },
  billingCountry: { type: String, default: null, trim: true },
  billingPostalCode: { type: String, default: null, trim: true },
  billingState: { type: String, default: null, trim: true },
  billingStreet: { type: String, default: null, trim: true },

  shippingAddress: { type: String, default: null, trim: true },
  shippingCity: { type: String, default: null, trim: true },
  shippingCountry: { type: String, default: null, trim: true },
  shippingPostalCode: { type: String, default: null, trim: true },
  shippingState: { type: String, default: null, trim: true },
  shippingStreet: { type: String, default: null, trim: true },
  apps: { type: Array, default: [] },
  disabledDate: { type: Date, default: null }
});

accountSchema.set('toJSON', { virtuals: true });
accountSchema.set('toObject', { virtuals: true });

/* TODO: refactor: use config in calling code
accountSchema.virtual('sfdcAccountURL').get(function() {
  if (this.sfdcAccountId) {
    return config.get('salesforce:auth:url') + '/' + this.sfdcAccountId.replace('Lead', '');
  }
  return null;
});

accountSchema.path('sfdcAccountId').set(function(newValue) {
  this.previousfdcAccountId = this.sfdcAccountId;
  return newValue;
});

accountSchema.path('cname').set(function(newValue) {
  this.previouscname = this.cname;
  return newValue;
});
*/

/* TODO: refactor: move to account-service
accountSchema.pre('save', function(next) {
  var account = this;
  var error;

  if (account.previousfdcAccountId &&
    account.sfdcAccountId !== account.previousfdcAccountId &&
    account.previousfdcAccountId.indexOf('Lead') < 0) {
    error = new Error(consts.SERVER_ERRORS.ACCOUNT.CAN_NOT_CHANGE_SFDC_ACCOUNT);
    return next(error);
  }

  if (account.cname) {
    var Account = mongoose.model('account');
    Account.find({ cname: account.cname }, function(err, accounts) {
      if (err) {
        return next(err);
      }
      if (accounts.length > 0 && accounts[0]._id.toString() !== account._id.toString()) {
        error = new Error('cname should be unique');
        error.status = 422;
        return next(error);
      }
      if (account.cname !== account.previouscname && config.get('aws:route53:createcname')) {
        async.series([
            function(callback){
              route53Utils.addCNAME(account.cname, callback);
            },
            function(callback){
              if (account.previouscname) {
                route53Utils.deleteCNAME(account.previouscname, callback);
              } else {
                callback(null, null);
              }
            }
          ],
          function(awsErr) {
            if (awsErr) {
              return next(awsErr);
            }
            return next();
          });
      }
      return next();
    });
    return next();
  }
});
*/
exports = mongoose.model('account', accountSchema);
