'use strict';

var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

function MessageDAO() {
}

MessageDAO.prototype = {
  constructor: MessageDAO,

  broadcast: function (message) {
  },

  onMessageReceived: function (user, message) {
    this.broadcast({message: this.sanitize(message), username: user.getName()});
  },

  //TODO: Should I create a Message class and put this in it?
  sanitize: function (message) {
    var result;

    if(message.length > 140){
      message = message.substring(0,140);
    }

    result = entities.encode(message);

    return result;
  }
};

module.exports = MessageDAO;