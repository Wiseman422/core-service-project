'use strict';

var mongoose = require('mongoose');
var consts   = require('../consts');
var Schema   = mongoose.Schema;

var tagStateGatewayNetworkSchema = new Schema({
  dataType: { type: String, enum: consts.TAG_STATE_DATATYPES },
  deviceID: { type: String, trim: true, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },

  networkState: { type: String, required: true, trim: true },
});

exports = mongoose.model('gatewayNetwork', tagStateGatewayNetworkSchema, 'tagstates');
