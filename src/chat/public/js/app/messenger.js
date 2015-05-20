'use strict';
define(['messengerInterface'],function(MessengerInterface) {

    var messengerInterface = Object.create(MessengerInterface);

    function Messenger(listener) {
        this.listener = listener;
    }

    Messenger.prototype = {
        constructor: Messenger,

        onMessageReceived: messengerInterface.sendMessageEvent = function (message) {
            this.listener.update(message);
        },

        sendMessage: messengerInterface.sendMessageEvent = function (message) {

        }

    };
    return Messenger;
});