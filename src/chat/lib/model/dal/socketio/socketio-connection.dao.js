'use strict';

function SocketIoConnectionDAO(io, connectionDAO, messageDAO) {
  this._io = io;
  this._messageDAO = messageDAO;
  this._connectionDAO = connectionDAO;
  this._userId = undefined;

  this._defineOnConnectionEvent();
}

SocketIoConnectionDAO.prototype = {
  constructor: SocketIoConnectionDAO,

  _defineOnConnectionEvent: function () {
    var self = this;
    self._io.on('connection', function (client) {
      self._connectionDAO.connect({userId: self._userId, connectionId: client.id}, function (user) {
        self._messageDAO.setOnMessageEvent(user, client);
      });
    });

    self._io.use(function (socket, next) {
      self._userId = socket.request._query.userId;
      next();
    });
  }
};

module.exports = SocketIoConnectionDAO;