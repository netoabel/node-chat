'use strict';
//TODO: Is it ok if UserList knows User?
var User = require('./user');

function UserList(){
  this.users = [];
}

UserList.prototype = {
  constructor: UserList,

  add: function (user) {
    if(user && user instanceof User && user.isValid()) {
      this.users.push(user);
    }
  },

  remove: function (userId) {
    this.users = this.users.filter(function (user) {
      return user.userId !== userId;
    });
  },

  getUserById: function (userId) {
    var result;
    result = this.users.filter(function (user) {
      return user.userId === userId;
    })[0];

    if(result) {
      return new User({
        userId: result.userId,
        name: result.name
      });
    }
  }
};

module.exports = UserList;