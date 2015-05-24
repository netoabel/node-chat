'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

function SocketIoMessageDAO(){
}

SocketIoMessageDAO.prototype = {
  constructor: SocketIoMessageDAO,

  setup: function (dao) {
    var broadcast = dao.broadcast;

    dao.broadcast = function (message) {
      broadcast(message);
      io.emit('chat-message', message);
    };
  }
};

module.exports = SocketIoMessageDAO;