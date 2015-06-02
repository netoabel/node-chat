'use strict';

var Message = require('../view/message');

function MessageHandler(userList) {
  this._userList = userList;
}

MessageHandler.prototype = {
  constructor: MessageHandler,

  createMessage: function (messageText, userId, callback) {
    var user = this._userList.get(userId);
    var message = new Message({username: user.getName(), text: messageText});

    callback(message);
  }
};

module.exports = MessageHandler;