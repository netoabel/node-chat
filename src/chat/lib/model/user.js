'use strict';

function User(data){
  if(data) {
    this.name = data.name;
    this.userId = data.userId;
  }
}

User.prototype = {
  constructor: User,

  isValid: function () {
    var result = true;
    if(!this.name || !this.userId) {
      result = false;
    }
    return result;
  }
};

module.exports = User;