"use strict";
//var socket = io.connect('ws://localhost:3000');

define(["connectionInterface"],function(ConnectionInterface) {

    var connectionInterface = Object.create(ConnectionInterface);

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

        startConnection: connectionInterface.startConnection = function (uri,userId) {
            this._socket = this.io.connect(uri,{query: userId });
        },


        isConnected: connectionInterface.isConnected = function() {
            var connected = false;
            if (this._socket && this._socket.connected) {
                connected = true;
            }
            return connected;
        },

        registerMessenger: connectionInterface.registerMessenger = function(messenger){
            var self = this;
            if (this.isConnected()) {
                this._socket.on('chat-message', messenger.onMessageReceived);

                var base = messenger.sendMessage.bind(messenger);
                messenger.sendMessage = function (message) {
                    base(message);
                    self._socket.emit('chat-message', message);
                };
            } else{
                throw  new Error('socket is disconnected')
            }
        }
    };
    return SocketIoController;
});



