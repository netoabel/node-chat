'use strict';
var Promise = require('bluebird');
var User = require('../../user.js');

function UserDAO() {
  this.users = [
    { userId: '1', name: 'User 1' },
    { userId: '2', name: 'User 2' }
  ];
}

UserDAO.prototype = {
  constructor: UserDAO,

  setup: function (dao) {
    var self = this;
    var getUser = dao.getUser;

    dao.getUser = function (userId) {
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
  }
};

module.exports = UserDAO;