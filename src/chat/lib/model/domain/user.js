'use strict';

function User(data) {
  if (data) {
    this._userId = data.userId;
    this._name = data.name;
    this._connectionId = data.connectionId;
  }
}

User.prototype = {
  constructor: User,

  getUserId: function () {
    return this._userId;
  },

  getConnectionId: function () {
    return this._connectionId;
  },

  setConnectionId: function (id) {
    this._connectionId = id;
  },

  getName: function () {
    return this._name;
  }
};

module.exports = User;
