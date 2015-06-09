'use strict';

var User = require('./user');

function UserList() {
  this._list = [];
}

UserList.prototype = {
  constructor: UserList,

  add: function (user) {
    if (user && user instanceof User) {
      this.remove({userId: user.getUserId()});
      this._list.push(user);
    }
  },

  remove: function (args) {
    var index = this._list.indexOf(this.get(args));
    if (index > -1) {
      this._list.splice(index, 1);
    }
  },

  get: function (args) {
    if(args) {
      for (var i = 0; i < this._list.length; i++) {
        var user = this._list[i];
        if (args.userId && user.getUserId() === args.userId) {
          return user;
        } else if (args.connectionId && user.getConnectionId() === args.connectionId) {
          return user;
        }
      }
    }
  },

  getList: function () {
    return this._list;
  }
};

module.exports = UserList;
