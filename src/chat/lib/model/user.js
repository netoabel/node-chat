'use strict';

function User(data){
  if(data) {
    //this._connectionId = data.connectionId;
    this._userId = data.userId;
    this._name = data.name;
    this._connectionId = data.connectionId;

    //var connectionId = data.connectionId;
    //var userId = data.userId;
    //var name = data.name;
    //
    //Object.defineProperties(this, {
    //  "_connectionId": {
    //    get: function () {
    //      return connectionId;
    //    }
    //  },
    //
    //  "_userId": {
    //    get: function () {
    //      return userId;
    //    }
    //  },
    //
    //  "_name": {
    //    get: function () {
    //      return name;
    //    }
    //  }
    //});
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
