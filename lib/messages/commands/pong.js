'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var umbrucore = require('umbrucore-lib');
var utils = require('../utils');
var $ = umbrucore.util.preconditions;
var _ = umbrucore.deps._;
var BufferUtil = umbrucore.util.buffer;
var BufferReader = umbrucore.encoding.BufferReader;

/**
 * A message in response to a ping message.
 * @param {Number} arg - A nonce for the Pong message
 * @param {Object=} options
 * @extends Message
 * @constructor
 */
function PongMessage(arg, options) {
  Message.call(this, options);
  this.command = 'pong';
  $.checkArgument(
    _.isUndefined(arg) || (BufferUtil.isBuffer(arg) && arg.length === 8),
    'First argument is expected to be an 8 byte buffer'
  );
  this.nonce = arg || utils.getNonce();
}
inherits(PongMessage, Message);

PongMessage.prototype.setPayload = function(payload) {
  var parser = new BufferReader(payload);
  this.nonce = parser.read(8);

  utils.checkFinished(parser);
};

PongMessage.prototype.getPayload = function() {
  return this.nonce;
};

module.exports = PongMessage;
