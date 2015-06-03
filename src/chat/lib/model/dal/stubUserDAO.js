'use strict';
var Promise = require('bluebird');
var User = require('../domain/user.js');

function UserDAO(dao) {
  this._dao = dao;
  this.users = [
    { userId: '1', name: 'Roberto Júnior' },
    { userId: '2', name: 'Bruno Alves' }
  ];
}

UserDAO.prototype = {
  constructor: UserDAO,

  _defineGetUser: function () {
    var self = this;
    var getUser = this._dao.getUser;

    this._dao.getUser = function (userId) {
      getUser(userId);

      return new Promise(function (resolve, reject) {

        var result;
        result = self.users.filter(function (user) {
          return user.userId === userId;
        })[0];

        if(result) {
          var user = new User({userId: result.userId, name: result.name});
        }

        resolve(user);

      });
    };
  },

  init: function () {
    this._defineGetUser();
  }
};

module.exports = UserDAO;