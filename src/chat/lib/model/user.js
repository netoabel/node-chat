'use strict';

function User(name){
  this.name = name
}

User.prototype = {
  constructor: User
};

module.exports = User;