'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

function SocketIoConnectionDAO(){
  this._userId = undefined;
}

SocketIoConnectionDAO.prototype = {
  constructor: SocketIoConnectionDAO,

  setup: function (connectionDAO, messageDAO) {
    var self = this;
    io.on('connection', function (client) {
      console.log('New client connected. Client id: ' + client.id);

      client.on('chat-message', function (data) {
        messageDAO.broadcast(data, null);
      });

      connectionDAO.connect({ userId: self._userId, connectionId: client.id }, null);
    });

    io.set('authorization', function (handshakeData, cb) {
      self._userId = handshakeData._query.userId;
      cb(null, true);
    });

    //TODO: It probably shouldn't be here
    http.listen(3000, function () {
      console.log('WebSocket server listening for connections on port 3000');
    });
  }
};

module.exports = SocketIoConnectionDAO;
