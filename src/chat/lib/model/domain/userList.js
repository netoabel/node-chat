'use strict';

var User = require('./user');

function UserList() {
  this._list = [];
}

UserList.prototype = {
  constructor: UserList,

  add: function (user) {
    if (user && user instanceof User) {
      this._list.push(user);
    }
  },

  remove: function (userId) {
    var result = [];
    for(var i = 0; i < this._list.length; i++){
      var user = this._list[i];
      if(user.getUserId() !== userId){
        result.push(user);
      }
    }
    this._list = result;
  },

  get: function (userId) {
    for(var i = 0; i < this._list.length; i++){
      var user = this._list[i];
      if(user.getUserId() === userId){
        return user;
      }
    }
  },

  getList: function () {
    return this._list;
  }
};

module.exports = UserList;
