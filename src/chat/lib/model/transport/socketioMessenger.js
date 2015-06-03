'use strict';

function SocketioMessenger(controller) {
  this._controller = controller;
}

SocketioMessenger.prototype = {
  constructor: SocketioMessenger,

  setOnMessageEvent: function (client) {
    var self = this;
    client.on('chat-message', function (data) {
      self._controller.onChatMessage(data.message, data.userId);
    });
  },

  _setupBroadcast: function (io) {
    var self = this;
    var broadcast = this._controller.broadcast;

    this._controller.broadcast = function (message) {
      broadcast(message);
      io.emit('chat-message', {username: message.getUserName(), text: message.getText()});
    };
  },

  init: function (io) {
    this._setupBroadcast(io);
  }
};

module.exports = SocketioMessenger;