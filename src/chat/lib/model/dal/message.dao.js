'use strict';

var Entities = require('html-entities').XmlEntities,
    Message = require('../message'),
    entities = new Entities();

function MessageDAO() {
}

MessageDAO.prototype = {
  constructor: MessageDAO,

  broadcast: function (message) {
  },

  setOnMessageEvent: function (user, client) {
  },

  onMessageReceived: function (user, message) {
    var message = new Message({username: user.getName(), text: message});
    message.sanitize();
    message.limitSize();
    this.broadcast(message);
  }
};

module.exports = MessageDAO;