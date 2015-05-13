'use strict';
var Promise = require('bluebird');

function UserDAO() {
  this.users = [
    { userId: '1', name: 'User 1' },
    { userId: '2', name: 'User 2' }
  ];
}

UserDAO.prototype = {
  constructor: UserDAO,

  getUserName: function (userId) {
    return new Promise(function (resolve, reject) {

      var result;
      result = this.users.filter(function (user) {
        return user.userId === userId;
      })[0];

      resolve(result);

    });
  }
};

module.exports = UserDAO;