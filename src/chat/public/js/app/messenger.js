'use strict';
define([],function() {

  function Messenger() {
    this.observer =  null
  }

  Messenger.prototype = {
    constructor: Messenger,

    onMessageReceived:function (message) {
      if(this.observer) {
        this.observer.update(message);
      }
    },

    setObserver: function(observer){
      this.observer = observer;
    },

    sendMessage: function (message, userId) {

    }

  };
  return Messenger;
});