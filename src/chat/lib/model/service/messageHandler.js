'use strict';

var Message = require('../view/message');

function MessageHandler(userList) {
  this._userList = userList;
}

MessageHandler.prototype = {
  constructor: MessageHandler,

  createMessage: function (messageText, userId, callback) {
    var user = this._userList.get({userId: userId});
    if(user) {
      var message = new Message({username: user.getName(), text: messageText});
      message.limitSize();
      message.sanitize();

      callback(message);
    }
  }
};

module.exports = MessageHandler;