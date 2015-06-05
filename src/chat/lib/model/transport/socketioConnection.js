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
      self._controller.onConnect(self._userId, client.id);

      client.on('disconnect', function () {
        self._controller.onDisconnect(self._userId);
      });
    });
  },
  
  _setupUserIdMiddleware: function () {
    var self = this;
    this._io.use(function (socket, next) {
      self._userId = socket.request._query.userId;
      next();
    });
  },

  init: function () {
    this._setupEvents();
    this._setupUserIdMiddleware();
  }
};

module.exports = SocketioConnection;