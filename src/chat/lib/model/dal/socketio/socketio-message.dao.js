'use strict';

function SocketIoMessageDAO(io){
  this._io = io;
}

SocketIoMessageDAO.prototype = {
  constructor: SocketIoMessageDAO,

  setup: function (dao) {
    var broadcast = dao.broadcast;
    var self = this;

    //TODO: Send the whole object or only the necessary data?
    dao.broadcast = function (message) {
      broadcast(message);
      self._io.emit('chat-message', message);
    };
  }
};

module.exports = SocketIoMessageDAO;