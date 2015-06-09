'use strict';

var http = require('http').Server();

function SocketioConnection(ioMessenger, controller) {
  this._io = require('socket.io')(http);
  this._controller = controller;
  this._ioMessenger = ioMessenger;
}

SocketioConnection.prototype = {
  constructor: SocketioConnection,

  startServer: function (port, callback) {
    var self = this;
    http.listen(port, function () {
      callback(self._io);
    });
  },
  
  _setupEvents: function () {
    var self = this;
    this._io.on('connection', function (client) {
      self._ioMessenger.setOnMessageEvent(client);
      self._controller.onConnect(client.request._query.userId, client.request._query.battleId, client.id);

      client.on('disconnect', function () {
        self._controller.onDisconnect(self._userId);
      });
    });

    this._io.on('error', function (error) {
      console.error(error);
    });
  },

  init: function () {
    this._setupEvents();
  }
};

module.exports = SocketioConnection;