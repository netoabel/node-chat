'use strict';
var User = require('./user'),
    list = [];

//TODO:     Find another way to declare private variables. This doesn't work. By doing it this way, we are declaring
//TODO      private variables that are shared to all instances of this class

function UserList(){
}

UserList.prototype = {
  constructor: UserList,

  add: function (user) {
    if(user && user instanceof User && user.isValid()) {
      list.push(user);
    }
  },

  remove: function (userId) {
    list = list.filter(function (user) {
      return user.getUserId() !== userId;
    });
  },

  get: function (userId) {
    var result = list.filter(function (user) {
      return user.getUserId() === userId;
    });

    if(result) {
      return result[0];
    }
  },

  getList: function () {
    return list;
  }
};

module.exports = UserList;