'use strict';

define(function(){
    var MessengerInterface = {
        sendMessage:function(){},
        onMessageReceived: function(message){}
    };
    return MessengerInterface;
});
