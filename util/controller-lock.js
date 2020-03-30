'use strict';

var _ = require('lodash');

function Locker() {
  this.defaultTimeout = 5000;
  this.locks = {};
}

Locker.prototype.bindSocket = function(socketIO) {
  socketIO.__emitBeforeChannelLockerSocket = socketIO.emit;
  this._socket = socketIO.id;

  var channelLocker = this;

  socketIO.emit = function(event) {
    channelLocker.unlock(event);
    this.__emitBeforeChannelLockerSocket.apply(this, arguments);
  };
  return socketIO;
};

Locker.prototype.unlock = function(event) {
  var key = event;
  if (!_.isUndefined(this.locks[key])) {
    clearTimeout(this.locks[key]);
    delete this.locks[key];
  }
};

Locker.prototype.tryLockAndRun = function(event, eventEmitter, _timeout) {
  var shouldRun = false;
  var timeout = _timeout ? _timeout : this.defaultTimeout;
  var keys;

  if (_.isArray(event)) {
    keys = event;
  } else {
    keys = [event];
  }

  keys.forEach(function(key) {
    if (_.isUndefined(this.locks[key])) {
      this.locks[key] = setTimeout((function() {
        this.unlock(event);
      }).bind(this), timeout);
      shouldRun = true;
    }
  }.bind(this));

  if (shouldRun) {
    eventEmitter();
  }
};

exports.Locker = Locker;
