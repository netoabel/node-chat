'use strict';

var User = require('../model/user');

function ConnectionController(users, dao){
  this.users = users;
  this.dao = dao;
}

ConnectionController.prototype = {
  constructor: ConnectionController,

  onUserConnection: function (user) {
    this.users.add(user);
  }
};

module.exports = ConnectionController;