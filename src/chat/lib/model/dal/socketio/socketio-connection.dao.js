'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

function SocketIoConnectionDAO(){
}

SocketIoConnectionDAO.prototype = {
  constructor: SocketIoConnectionDAO,

  registerDAO: function (connectionDAO) {
    io.on('connection', function (data) {
      connectionDAO.onConnect(data, null);
    });
  }
};

module.exports = SocketIoConnectionDAO;
