'use strict';

function SocketIoMessageDAO(io, dao) {
  this._io = io;
  this._dao = dao;

  //TODO: Is it better to keep these calls here or call them from outside? (make them public)
  this._defineBroadcast();
  this._defineSetOnMessageEvent();
}

SocketIoMessageDAO.prototype = {
  constructor: SocketIoMessageDAO,

  _defineBroadcast: function () {
    var broadcast = this._dao.broadcast;
    var self = this;

    this._dao.broadcast = function (message) {
      var data = {
        username: message.getUserName(),
        text: message.getText()
      };
      broadcast(data);
      self._io.emit('chat-message', data);
    };
  },

  _defineSetOnMessageEvent: function () {
    var setOnMessageEvent = this._dao.setOnMessageEvent;
    var self = this;

    this._dao.setOnMessageEvent = function (user, client) {
      setOnMessageEvent(user, client);
      client.on('chat-message', function (data) {
        self._dao.onMessageReceived(user, data.message);
      });
    };
  }
};

module.exports = SocketIoMessageDAO;