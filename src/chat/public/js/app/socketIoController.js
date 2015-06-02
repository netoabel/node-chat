"use strict";

define([],function() {

  function SocketIoController(ioClass) {
    var io = ioClass;
    this._socket = null;

    Object.defineProperty(this,"io",{
      get:function(){
        return io;
      }
    });
  }

  SocketIoController.prototype = {
    constructor: SocketIoController,

    startConnection: function (uri,userId) {
      this._socket = this.io.connect(uri,{query: 'userId='+userId });
    },


    isConnected: function() {
      var connected = false;
      if (this._socket && this._socket.connected) {
        connected = true;
      }
      return connected;
    },

    registerMessenger: function(messenger){
      var self = this;
      this._socket.on('chat-message', messenger.onMessageReceived.bind(messenger));

      var base = messenger.sendMessage.bind(messenger);
      messenger.sendMessage = function (message) {
        base(message);
        self._socket.emit('chat-message',{message: message});
      };

    }
  };
  return SocketIoController;
});



