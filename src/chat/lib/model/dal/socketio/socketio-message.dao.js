'use strict';

function SocketIoMessageDAO(io) {
  this._io = io;
}

SocketIoMessageDAO.prototype = {
  constructor: SocketIoMessageDAO,

  setup: function (dao) {
    var broadcast = dao.broadcast;
    var setOnMessageEvent = dao.setOnMessageEvent;
    var self = this;

    dao.broadcast = function (message) {
      var data = {
        username: message.getUserName(),
        text: message.getText()
      };
      broadcast(data);
      self._io.emit('chat-message', data);
    };

    dao.setOnMessageEvent = function (user, client) {
      setOnMessageEvent(user, client);
      client.on('chat-message', function (data) {
        dao.onMessageReceived(user, data.message);
      });
    };
  }
};

module.exports = SocketIoMessageDAO;