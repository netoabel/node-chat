'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

function SocketIoMessageDAO(){
}

SocketIoMessageDAO.prototype = {
  constructor: SocketIoMessageDAO,

  registerDAO: function (dao) {
    var broadcast = dao.broadcast;

    dao.broadcast = function (message) {
      broadcast(message);
      io.emit('message', msg);
    };

    io.on('message', function (data) {
      dao.broadcast(data, null);
    });
  }
};

module.exports = SocketIoMessageDAO;