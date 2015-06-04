'use strict';

var User = require('../domain/user');

function UserHandler(userList, dao) {
  this._userList = userList;
  this._dao = dao;
}

UserHandler.prototype = {
  constructor: UserHandler,

  createUser: function (userId, connectionId, callback) {
    var self = this;
    this._dao.getUser(userId).then(function (user) {
      if (user) {
        user.setConnectionId(connectionId);
        self._userList.add(user);
      }
      if (callback) {
        callback(user);
      }
    });
  },

  destroyUser: function (userId) {
    this._userList.remove(userId);
  },

  //TODO: Should it be inside createUser?
  addToUserList: function (user) {
    this._userList.add(user);
  }
};

module.exports = UserHandler;