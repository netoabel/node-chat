'use strict';

function Message(){
  
}

Message.prototype = {
  constructor: Message,
  isValid: function () {
    return true;
  }
};

module.exports = Message;