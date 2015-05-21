'use strict';
define(['messengerInterface'],function(MessengerInterface) {

    var messengerInterface = Object.create(MessengerInterface);

    function Messenger() {
        this.observer =  null
    }

    Messenger.prototype = {
        constructor: Messenger,

        onMessageReceived: messengerInterface.sendMessageEvent = function (message) {
            if(this.observer) {
                this.observer.update(message);
            }
        },

        setObserver: function(observer){
            this.observer = observer;
        },

        sendMessage: messengerInterface.sendMessageEvent = function (message) {

        }

    };
    return Messenger;
});