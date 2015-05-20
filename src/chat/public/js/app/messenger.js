'use strict';
define(['messengerInterface'],function(MessengerInterface) {

    var messengerInterface = Object.create(MessengerInterface);

    function SocketMessenger(listener) {
        this.listener = listener;
    }

    SocketMessenger.prototype = {
        constructor: SocketMessenger,

        onMessageReceived: messengerInterface.sendMessageEvent = function (message) {
            this.listener.update(message);
        },

        sendMessage: messengerInterface.sendMessageEvent = function (message) {

        }

    };
    return SocketMessenger;
});