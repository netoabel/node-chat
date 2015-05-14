'use strict';

var User = (function () {

  var _ = new WeakMap();

  function User(data){
    if(data) {
      _[this] = {
        connectionId: data.connectionId,
        userId: data.userId,
        name: data.name
      };
    }
  }

  User.prototype = {
    constructor: User,

    getUserId: function () {
      return _[this].userId;
    },

    isValid: function () {
      var result = true;
      if(!_[this].name || !_[this].userId) {
        result = false;
      }
      return result;
    }
  };

  module.exports = User;

}());