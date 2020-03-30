'use strict';

var _      = require('lodash');
var crypto = require('crypto');
var config = require('../config');
var consts = require('../consts');

const CRYPT_ALGORITHM = 'aes-256-ctr';

function isDevelopmentEnv() {
  return config.get('env') === 'development';
}

function getDomain(usePlatformDomain) {
  if (usePlatformDomain) {
    return config.get('platformdomain');
  }
  return config.get('domain');
}

function redirectToLoginPage(res, redirectAfterLogin) {
  var redirectUrl;
  var coreDomain = config.get('platformdomain');

  if (coreDomain) {
    redirectUrl = coreDomain + consts.LOGIN_PAGE_URL;
  } else {
    redirectUrl = consts.LOGIN_PAGE_URL;
  }
  if (redirectAfterLogin) {
    redirectUrl += '?redirect=' + encodeURIComponent(redirectAfterLogin);
  }

  res.redirect(redirectUrl);
}

function encodeSeriesKey(key) {
  var encodedKey = key;

  var replacements = config.get('replacements');
  _.each(replacements, function(value, key) {
    encodedKey = encodedKey.split(key).join(value);
  });

  return encodedKey;
}

function removeAllSpaces(source) {
  return source.replace(/\s+/g, '');
}

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function multiReplace(source, replacements, newValue) {
  if (!newValue) {
    return '';
  }
  for (var i = 0; i < replacements.length; i++) {
    source = source.replace(new RegExp(escapeRegExp(replacements[i]), 'gi'), newValue);
  }
  return source;
}

function childExistsInParent(childObj, parent) {
  return _.indexOf(parent, childObj) !== -1;
}

function generateRandomString(len) {
  var text = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
}

function removeMongooseVersionField(obj) {
  if (obj) {
    delete obj.__v;
  }
}

function getPositiveValues(arr) {
  return _.filter(arr, function(value) {
    return value > 0;
  });
}

function getNegativeValues(arr) {
  return _.filter(arr, function(value) {
    return value < 0;
  });
}

function removeMultipleFields(obj, fields) {
  if (obj) {
    _.each(fields, (field) => _.unset(obj, field));
  }
}

function getCookieOptionsDefault(httpOnly) {
  return {
    path: '/',
    domain: isDevelopmentEnv() ? null : config.get('session:cookiedomain'),
    httpOnly: !!httpOnly,
    secure: config.get('cookie:secure')
  };
}

function getDefaultApps() {
  var apps = {};
  _.each(consts.ALLOWED_APPS, function(app) {
    apps[app] = config.get('apps:' + app.toLowerCase());
  });
  return apps;
}

function encryptField(field, key){
  var cipher = crypto.createCipher(CRYPT_ALGORITHM, key);
  var crypted = cipher.update(field, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decryptField(field, key){
  var decipher = crypto.createDecipher(CRYPT_ALGORITHM, key);
  var dec = decipher.update(field, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function encryptTagPassword(tag) {
  if (tag.tagType === consts.TAG_TYPE.Scope && tag.password){
    tag.password = encryptField(tag.password, config.get('scopecryptokey'));
  }
}

function decryptTagPassword(tag) {
  if (tag.tagType === consts.TAG_TYPE.Scope && tag.password){
    tag.password = decryptField(tag.password, config.get('scopecryptokey'));
  }
}

// TODO: moved to auth-service => exports.toUpperCaseArray = toUpperCaseArray;
exports.removeAllSpaces = removeAllSpaces;
exports.multiReplace = multiReplace;
exports.isDevelopmentEnv = isDevelopmentEnv;
// TODO: must be in bl-brighter-view => exports.cloneFieldsToMongooseModel = cloneFieldsToMongooseModel;
// TODO: moved to validationUtil => exports.hasDuplicateItems = hasDuplicateItems;
// TODO: use _.capitalize => exports.capitalizeString = capitalizeString;
exports.redirectToLoginPage = redirectToLoginPage;
// TODO: use log.error => exports.logError = logError;
// TODO: use log.error => exports.convertError = convertError;
// TODO: must be in bl-brighter-view => exports.getGraphWidgetIconUrlByName = getGraphWidgetIconUrlByName;
// TODO: must be in bl-brighter-view => exports.getDateByInterval = getDateByInterval;
// TODO: must be in bl-brighter-view => exports.compareDatesByInterval = compareDatesByInterval;
exports.encodeSeriesKey = encodeSeriesKey;
// TODO: moved to validationUtil => exports.isNumber = isNumber;
// TODO: moved to validationUtil => exports.isWholePositiveNumber = isWholePositiveNumber;
// TODO: moved to validationUtil => exports.isWholeNumber = isWholeNumber;
// TODO: must be in bl-brighter-view => exports.getParsedWebBox = getParsedWebBox;
// TODO: moved to validationUtil exports.isValidObjectID = isValidObjectID;
exports.getDomain = getDomain;
// TODO: moved to validationUtil => exports.isCreratorRoleChanged = isCreratorRoleChanged;
// TODO: moved to getWokerIdStr => exports.isCreatorChanged = isCreatorChanged;
exports.generateRandomString = generateRandomString;
exports.childExistsInParent = childExistsInParent;
exports.removeMongooseVersionField = removeMongooseVersionField;
// TODO: use _.sum => exports.getArraySum = getArraySum;
// TODO: must be in bl-brighter-view => exports.getFoldBySummaryMethod = getFoldBySummaryMethod;
// TODO: moved to auth-service => exports.destroySession = destroySession;
exports.getPositiveValues = getPositiveValues;
exports.getNegativeValues = getNegativeValues;
// TODO: use _.get => exports.getObjectValue = getObjectValue;
// TODO: use obj[key] = value => exports.setObjectValue = setObjectValue;
// TODO: must be in bl-brighter-view => exports.presentationErrorHandler = presentationErrorHandler;
// TODO: must be in bl-brighter-view => exports.dashboardErrorHandler = dashboardErrorHandler;
// TODO: must be in bl-brighter-view => exports.presentationSuccessResponse = presentationSuccessResponse;
// TODO: must be in bl-brighter-view => exports.dashboardSuccessResponse = dashboardSuccessResponse;
// TODO: moved to datetime-util => exports.getAllowedTimeZonesName = getAllowedTimeZonesName;
// TODO: moved to datetime-util => exports.getOffsetByTimeZone = getOffsetByTimeZone;
// TODO: moved to datetime-util => exports.getTimeZoneByOffset = getTimeZoneByOffset;
// TODO: must be in bl-brighter-view => exports.addOneDay = addOneDay;
// TODO: must be in bl-brighter-view => exports.getLastDateFromTempoIQResults = getLastDateFromTempoIQResults;
// TODO: must be in bl-brighter-view => exports.getFirstDateFromTempoIQResults = getFirstDateFromTempoIQResults;
// TODO: must be in bl-brighter-view => exports.removeDuplicateTempoIQDates = removeDuplicateTempoIQDates;
exports.removeMultipleFields = removeMultipleFields;
// TODO: removed => exports.getWokerIdStr = getWokerIdStr;
exports.getCookieOptionsDefault = getCookieOptionsDefault;
// TODO: must be in user-service => exports.compressAndEncodeBase64 = compressAndEncodeBase64;
// TODO: must be in user-service => exports.decodeBase64AndDecompress = decodeBase64AndDecompress;
exports.getDefaultApps = getDefaultApps;
// TODO: moved to validationUtil => exports.isValidMonth = isValidMonth;
// TODO: must be in user-service => exports.parseEmail = parseEmail;
// TODO: must be in analyze-service => exports.getLinearInterpolatedValue = getLinearInterpolatedValue;
exports.encryptField = encryptField;
exports.decryptField = decryptField;
exports.encryptTagPassword = encryptTagPassword;
exports.decryptTagPassword = decryptTagPassword;
// TODO: must be in account-service => exports.appsValidator = appsValidator;
