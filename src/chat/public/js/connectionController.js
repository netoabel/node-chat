
//var socket = io.connect('ws://localhost:3000');

function ConnectionController(ioClass){
    this.io = ioClass || io;
    this.socket = null;
}

ConnectionController.prototype = {
    constructor: ConnectionController,

    startConnection: function(uri){
        this.socket = this.io.connect(uri);
    },

    setMessageReceivedEvent: function(event){
        if(this.socket && typeof(event) === "function") {
            this.socket.on('chat-message', event)
        } else {
            throw Error("fail in creating the event");
        }
    },

    sendMessageEvent: function(message){
        if(this.socket && message){
            this.socket.emit('chat-message',message);
        } else {
            throw  Error("fail in send event")
        }

    },

    isConnected: function(){

    }
};



