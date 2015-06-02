'use strict';

function MessageController(handler) {
  this._handler = handler;
}

MessageController.prototype = {
  constructor: MessageController,

  onChatMessage: function (messageText, userId) {
    var self = this;
    this._handler.createMessage(messageText, userId, function (message) {
      self.broadcast(message);
    });
  },

  broadcast: function (message) {
  }

};

module.exports = MessageController;