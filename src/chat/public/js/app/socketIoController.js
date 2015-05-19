"use strict";
//var socket = io.connect('ws://localhost:3000');

define(["connectionController"],function(connectionController) {
    function SocketIoController(ioClass) {
        this.io = ioClass;
        this.socket = null;
    }

    SocketIoController.prototype = {
        constructor: SocketIoController,

        startConnection: Object.create(connectionController).startConnection = function (uri) {
            this.socket = this.io.connect(uri);
        },

        setMessageReceivedEvent: function (event) {
            if (this.isConnected() && typeof(event) === "function") {
                this.socket.on('chat-message', event)
            } else {
                throw Error("fail in creating the event");
            }
        },

        sendMessageEvent: function (message) {
            if (this.isConnected() && message) {
                this.socket.emit('chat-message', message);
            } else {
                throw  Error("fail in send event")
            }
        },

        isConnected: Object.create(connectionController).startConnection = function() {
            var connected = false;
            if (this.socket && this.socket.connected) {
                connected = true;
            }
            return connected;
        }

    };
    return SocketIoController;
});



