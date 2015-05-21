'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

function SocketIoConnectionDAO(){
}

SocketIoConnectionDAO.prototype = {
  constructor: SocketIoConnectionDAO,

  registerServer: function (server) {
    io.on('connection', function (data) {
      server.onConnect(data, null);
    });
  }
};

module.exports = SocketIoConnectionDAO;
