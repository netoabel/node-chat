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
    this.broadcast({message: entities.encode(message), username: user.getName()});
  }
};

module.exports = MessageDAO;