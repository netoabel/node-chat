'use strict';

function MessageController(listener,connectionController){
    this.listener = listener;
    this.connectionController = connectionController;
}

MessageController.prototype = {
    constructor: MessageController,

    setOnMessageReceivedEvent: function(){
        this.connectionController.setMessageReceivedEvent(this.onMessageReceived);
    },

    onMessageReceived: function(message) {
        this.listener.update(message);
    },

    sendMessageEvent: function(message){
        this.connectionController.sendMessageEvent(message);
    }

};