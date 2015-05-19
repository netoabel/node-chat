'use strict';
define(['messengerController'],function(MessengerController) {

    var messageController = Object.create(MessengerController);

    function SocketMessenger(listener, connectionController) {
        this.listener = listener;
        this.connectionController = connectionController;
    }

    SocketMessenger.prototype = {
        constructor: SocketMessenger,

        setOnMessageReceivedEvent: messageController.setOnMessageReceivedEvent = function () {
            this.connectionController.setMessageReceivedEvent(this.onMessageReceived);
        },

        onMessageReceived: function (message) {
            this.listener.update(message);
        },

        sendMessageEvent:messageController.sendMessageEvent = function (message) {
            this.connectionController.sendMessageEvent(message);
        }

    };
    return SocketMessenger;
});