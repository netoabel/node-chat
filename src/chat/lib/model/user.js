'use strict';

var connectionId,
    name,
    userId;

function User(data){
  if(data) {
    connectionId = data.connectionId;
    userId = data.userId;
    name = data.name;
  }
}

User.prototype = {
  constructor: User,

  getUserId: function () {
    return userId;
  },

  isValid: function () {
    var result = true;
    if(!name || !userId) {
      result = false;
    }
    return result;
  }
};

module.exports = User;