'use strict';

var _                         = require('lodash');
var Promise                   = require('bluebird');
var ObjectNotFoundError       = require('../errors/object-notfound-error');
var AccessDeniedError         = require('../errors/access-denied-error');
var UnprocessableRequestError = require('../errors/unprocessable-request-error');
var UnauthorizedRequestError  = require('../errors/unauthorized-request-error');
var DuplicateObjectError      = require('../errors/duplicate-object-error');
var ThirdPartyServiceError    = require('../errors/third-party-service-error');
var BusinessLogicError        = require('../errors/business-logic-error');
var DbValidationError         = require('../errors/db-validation-error');

module.exports = {
    isObjectNotFoundError: function(err) {
        return err instanceof ObjectNotFoundError;
    },
    isAccessDeniedError: function(err) {
        return err instanceof AccessDeniedError;
    },
    isUnprocessableRequestError: function(err) {
        return err instanceof UnprocessableRequestError;
    },
    isUnauthorizedRequestError: function(err) {
        return err instanceof UnauthorizedRequestError;
    },
    isDuplicateObjectError: function(err) {
        return err instanceof DuplicateObjectError;
    },
    isThirdPartyServiceError: function(err) {
        return err instanceof ThirdPartyServiceError;
    },
    isBusinessLogicError: function(err) {
        return err instanceof BusinessLogicError;
    },
    isDbValidationError: function(err) {
        return err instanceof DbValidationError;
    },
    isObjectValidationError: function(err) {
        return ((err.name === 'ValidationError') || 
                (!!err.message && err.message.indexOf('ValidationError') !== -1)); // TODO: use typed error
    },

    getObjectNotFoundError: function(msg, info) {
        return new ObjectNotFoundError(msg, info);
    },
    getAccessDeniedError: function(msg, info) {
        return new AccessDeniedError(msg, info);
    },
    getUnprocessableRequestError: function(name, errMsg, info) {
        var finalMsg;
        switch (arguments.length) {
            case 1:
                finalMsg = name;
                break;
            case 2:
                if (typeof errMsg === 'string') {
                    finalMsg = 'Invalid parameter ' + _.capitalize(name) + '. ' + errMsg;
                } else {
                    finalMsg = name;
                    info = errMsg;
                }
                break;
            case 3:
                finalMsg = 'Invalid parameter ' + _.capitalize(name) + '. ' + errMsg;
                break;
        }
        return new UnprocessableRequestError(finalMsg, info);
    },
    getUnauthorizedRequestError: function(msg, info) {
        return new UnauthorizedRequestError(msg, info);
    },
    getDuplicateObjectError: function(msg, info) {
        return new DuplicateObjectError(msg, info);
    },
    getThirdPartyServiceError: function(serviceErr, msg, info) {
        var finalMsg;
        switch (arguments.length) {
            case 1:
                finalMsg = 'Third party service error: ' + serviceErr;
                break;
            case 2:
                if (typeof msg === 'object') {
                    finalMsg = 'Third party service error: ' + serviceErr;
                    info = msg;
                } else {
                    finalMsg = 'Third party service error: ' + msg + '. ' + serviceErr;
                }
                break;
            case 3:
                finalMsg = 'Third party service error: ' + msg + '. ' + serviceErr;
                break;
        }
        return new ThirdPartyServiceError(finalMsg, info);
    },
    getBusinessLogicError: function(msg, info) {
        return new BusinessLogicError(msg, info);
    },
    getDbValidationError: function(msg, info) {
        return new DbValidationError(msg, info);
    },

    rejectWithObjectNotFoundError: function(msg, info) {
        var err = this.getObjectNotFoundError(msg, info);
        return Promise.reject(err);
    },
    rejectWithAccessDeniedError: function(msg, info) {
        var err = this.getAccessDeniedError(msg, info);
        return Promise.reject(err);
    },
    rejectWithUnprocessableRequestError: function(name, errMsg, info) {
        var err = this.getUnprocessableRequestError(name, errMsg, info);
        return Promise.reject(err);
    },
    rejectWithUnauthorizedRequestError: function(msg, info) {
        var err = this.getUnauthorizedRequestError(msg, info);
        return Promise.reject(err);
    },
    rejectWithDuplicateObjectError: function(msg, info) {
        var err = this.getDuplicateObjectError(msg, info);
        return Promise.reject(err);
    },
    rejectWithThirdPartyServiceError: function(serviceErr, msg, info) {
        var err = this.getThirdPartyServiceError(serviceErr, msg, info);
        return Promise.reject(err);
    },
    rejectWithBusinessLogicError: function(msg, info) {
        var err = this.getBusinessLogicError(msg, info);
        return Promise.reject(err);
    },
    rejectWithDbValidationError: function(msg, info) {
        var err = this.getDbValidationError(msg, info);
        return Promise.reject(err);
    },

    isKnownError: function(err) {
      return this.isObjectNotFoundError(err) ||
              this.isAccessDeniedError(err) ||
              this.isUnprocessableRequestError(err) ||
              this.isUnauthorizedRequestError(err) ||
              this.isDuplicateObjectError(err) ||
              this.isThirdPartyServiceError(err) ||
              this.isBusinessLogicError(err) ||
              this.isDbValidationError(err) ||
              this.isObjectValidationError(err);
    }
};
