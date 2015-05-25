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
      console.log('New client connected.\nClient id: ' + client.id + '\nUser id: ' + self._userId);

      connectionDAO.connect({ userId: self._userId, connectionId: client.id }, function (user) {
        client.on('chat-message', function (data) {
          data.username = user.getName();
          console.log(data)
          messageDAO.broadcast(data, null);
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
