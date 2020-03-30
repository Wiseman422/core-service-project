'use strict';

var _              = require('lodash');
var path           = require('path');
var emailTemplates = require('email-templates');
var nodemailer     = require('nodemailer');
var Promise        = require('bluebird');
var config         = require('../config');
var consts         = require('../consts');
var log            = require('../util/logger');
var commonUtil     = require('../util/common-util');

var templatesDir = path.resolve(__dirname, '../../src/email-sender', 'templates');
var THANK_YOU = '<p> - The Brightergy Team</p>';

var _smtpTransport;

function getOrCreateSmtpTransport() {
  if (!_smtpTransport) {
    _smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.get('email:username'),
        pass: config.get('email:password')
      }
    });
  }

  return _smtpTransport;
}

function _encodeHtml(html) {
  return html.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

function _getSetPasswordUrl(tokens) {
  var domain = commonUtil.getDomain(true);
  var tokenObj = _.where(tokens, { 'type': consts.USER_TOKENS.SET_PASSWORD });
  return domain + consts.SET_PASSWORD_PAGE_URL + tokenObj[0].token;
}

exports._sendEmail = function(mailOptions, content) {
  return new Promise((resolve, reject) => {
    emailTemplates(templatesDir, function(err, template) {
      if (err) {
        log.error(err);
        return reject(err);
      }
      var locals = { content: content };
      template('email', locals, function(err, html) {
        mailOptions.from = config.get('email:username');
        mailOptions.html = _encodeHtml(html);
        getOrCreateSmtpTransport().sendMail(mailOptions, function(err) {
          if (err) {
            log.error('smtp error: ' + err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  });
};

exports.sendExceptionOccuredEmail = function(errStr) {
  if (!config.get('email:onerrorsendemail')) {
    return;
  }

  var mailOptions = {
    to: config.get('email:recipients:erroroccured'),
    subject: 'Exception occured on Client Portal instance: ' + config.get('instance'),
    text: errStr
  };

  var content = '<p>' + errStr + '</p>';
  return exports._sendEmail(mailOptions, content);
};

exports.sendSetPasswordEmail = function(user) {
  var url = _getSetPasswordUrl(user.tokens);
  var content = `<h1>Hi ${user.name},</h1>`;
  content += `<br/><br/>`;
  content += `<p>Please set your new password for the Brightergy Client Portal by clicking`;
  content += `  <a href="${url}">here.</a>`;
  content += `</p>`;
  content += THANK_YOU;

  var mailOptions = {
    to: user.email,
    subject: 'Brightergy Client Portal: Set Password'
  };

  return exports._sendEmail(mailOptions, content);
};

exports.sendPresentationLinkEmail = function(email, message, link) {
  var content = `<p>${message},</p>`;
  content += `<br/>`;
  content += `<a href="${link}">Presentation link.</a>`;
  content += THANK_YOU;

  var mailOptions = {
    to: email,
    subject: 'Brightergy Client Portal Presentation'
  };

  return exports._sendEmail(mailOptions, content);
};

exports.sendNewUtilityProviderEmail = function(accountsUrls, userSFDCContactURL, text) {
  var content = '';
  if (accountsUrls.length > 0) {
    content = `<strong>Account:</strong> ${accountsUrls.join(', ')}<br/>`;
  }
  if (userSFDCContactURL) {
    content += `<strong>Master Manager:</strong> ${userSFDCContactURL}<br/>`;
  }
  content += `<strong>message:</strong> ${text}`;
  content += THANK_YOU;

  var mailOptions = {
    to: config.get('email:recipients:newutilityprovider'),
    subject: 'New Utility Provider and/or Variant'
  };

  return exports._sendEmail(mailOptions, content);
};

/* jshint maxparams: 6 */
exports.sendDashboardLinkEmail = function(email, subject, message, link, title, pdfPath) {
  var content = `<p>${message}</p><br/>`;
  content += `<a href="${link}">${title}</a><br/>`;
  content += THANK_YOU;

  var mailOptions = {
    to: email,
    subject: subject
  };

  if (pdfPath) {
    mailOptions.attachments = [{
      filename: title + '.pdf',
      path: pdfPath
    }];
  }

  return exports._sendEmail(mailOptions, content);
};
