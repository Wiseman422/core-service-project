'use strict';

var _      = require('lodash');
var moment = require('moment');

module.exports = {
  isValidObjectId: function(val) {
    var regexp = /^[0-9a-fA-F]{24}$/;
    return _.isString(val) && regexp.test(val);
  },
  isValidLatitude: function(latitude) {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  },
  isValidLongitude: function(longitude) {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  },
  isValidTimeOffset: function(offset) {
    return !isNaN(offset) && offset >= -720 && offset <= 840; // -12h <= tz <= +14h
  },
  isValidUnixDate: function(date) {
    return !isNaN(date) && date > 0;
  },
  isValidUnixDatesRange: function(start, end) {
    return start < end && moment.unix(end).diff(moment.unix(start), 'y', true) <= 1.0;
  },
  isValidDateRange: function(dateRange) {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return false;
    }
    if (!moment(dateRange.from, moment.defaultFormat).isValid() ||
        !moment(dateRange.to, moment.defaultFormat).isValid()) {
      return false;
    }
    if (moment(dateRange.from) > moment(dateRange.to)) {
      return false;
    }
    return true;
  },
  isValidMonth: function(month) {
    return !_.isUndefined(month) && this.isNumber(month) && month >= 0 && month <= 11;
  },
  isArraysDiff: function(standarArr, checkedArr) {
    return _.isArray(checkedArr) && _.difference(checkedArr, standarArr).length === 0;
  },
  hasDuplicateItems: function(arr){
    return arr.length !== _.uniq(arr).length;
  },
  isValidEmail: function(email) {
    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    return email !== '' && re.test(email);
  },
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isWholeNumber: function(num){
    return this.isNumber(num) && num % 1 === 0;
  },
  isWholePositiveNumber: function(num){
    return this.isWholeNumber(num) && num > 0;
  },

  isCreatorChanged: function(obj) {
    return !!(obj.previousCreator && obj.creator.toString() !== obj.previousCreator.toString());
  },
  isRoleChanged: function(obj) {
    return !!(obj.previousRole && obj.role !== obj.previousRole);
  },
  isCreratorRoleChanged: function(obj) {
    return !!(obj.previousCreatorRole && obj.creatorRole !== obj.previousCreatorRole);
  },
  isDataSourceTypeChanged: function(obj) {
    return !!(obj.previousDataSourceType && obj.dataSourceType !== obj.previousDataSourceType);
  },
  isTagTypeChanged: function(obj) {
    return !!(obj.previousTagType && obj.tagType !== obj.previousTagType);
  }
};
