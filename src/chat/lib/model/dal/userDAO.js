'use strict';
var User = require('../domain/user.js');

function UserDAO() {
}

UserDAO.prototype = {
  constructor: UserDAO,

  getUser: function (userId) {
  }
};

module.exports = UserDAO;