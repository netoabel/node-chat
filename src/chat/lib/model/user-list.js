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

  remove: function (data) {
    this._list = this._list.filter(function (user) {
      if (data.connectionId) {
        return user.getConnectionId() !== data.connectionId;
      }
    });
  },

  get: function (userId) {
    var result = this._list.filter(function (user) {
      return user.getUserId() === userId;
    });

    if (result) {
      return result[0];
    }
  },

  getList: function () {
    return this._list;
  }
};

module.exports = UserList;
