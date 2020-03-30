'use strict';

function _getSuccessAnswer(answer) {
  return {
    success: 1,
    message: answer
  };
}

function _getErrorAnswer(answer) {
  return {
    success: 0,
    message: answer
  };
}

var ClientWebsocketAnswer = function(socket, eventName) {
  this.socket = socket;
  this.event = eventName;
};

ClientWebsocketAnswer.prototype.send = function(message) {
  var result = _getSuccessAnswer(message);
  this.socket.emit(this.event, result);
};

ClientWebsocketAnswer.prototype.ok = ClientWebsocketAnswer.prototype.send;

ClientWebsocketAnswer.prototype.error = function(message) {
  var result = _getErrorAnswer(message);
  this.socket.emit(this.event, result);
};

module.exports = ClientWebsocketAnswer;
