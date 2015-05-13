'use strict';

function MessageController(listener){
    this.listener = listener;
    this.connectionController = null;

    if(!listener){
        throw Error("is missing parameters");
    }
}

MessageController.prototype = {
    constructor: MessageController



};