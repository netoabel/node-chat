'use strict';

var UserList = (function () {

  var _ = new WeakMap();

  var User = require('./user');

  //TODO:     Find another way to declare private variables. This doesn't work. By doing it this way, we are declaring
  //TODO      private variables that are shared to all instances of this class

  function UserList(){
    _[this] = {
      list: []
    };
  }

  UserList.prototype = {
    constructor: UserList,

    add: function (user) {
      if(user && user instanceof User && user.isValid()) {
        _[this].list.push(user);
      }
    },

    remove: function (userId) {
      _[this].list = _[this].list.filter(function (user) {
        return user.getUserId() !== userId;
      });
    },

    get: function (userId) {
      var result = _[this].list.filter(function (user) {
        return user.getUserId() === userId;
      });

      if(result) {
        return result[0];
      }
    },

    getList: function () {
      return _[this].list;
    }
  };

  module.exports = UserList;

}());
