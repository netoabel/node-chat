'use strict';

function SocketIoConnectionDAO(io){
  this._io = io;
  this._userId = undefined;
}

SocketIoConnectionDAO.prototype = {
  constructor: SocketIoConnectionDAO,

  setup: function (connectionDAO, messageDAO) {
    var self = this;
    self._io.on('connection', function (client) {
      connectionDAO.connect({ userId: self._userId, connectionId: client.id }, function (user) {
        //TODO: It probably can be done in a better way
        client.on('chat-message', function (data) {
          messageDAO.onMessageReceived(user, data.message);
        });
      });
    });

    self._io.use(function (socket, next) {
      self._userId = socket.request._query.userId;
      next();
    });
  }
};

module.exports = SocketIoConnectionDAO;
