'use strict';
var Promise = require('bluebird');
var User = require('../user.js');

function UserDAO() {
}

UserDAO.prototype = {
  constructor: UserDAO,

  getUser: function (userId) {
  }
};

module.exports = UserDAO;