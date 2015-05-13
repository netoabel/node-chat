'use strict';

var expect = require('chai').expect,
    ConnectionController = require('../../../lib/controller/connection.controller'),
    UserDAO = require('../model/stub/user.dao.stub'),
    User = require('../../../lib/model/user'),
    UserList = require('../../../lib/model/user-list');

describe('Given ConnectionController', function () {
  describe('#onUserConnection()', function () {
    describe('With a valid user', function () {
      it('should add the given user to its user list', function () {
        var user = new User({ userId: '1', name: 'test' });
        var userList = new UserList();
        var userDAO = new UserDAO();
        var connection = new ConnectionController(userList, userDAO);

        connection.onUserConnection(user);

        expect(connection.users.getList()[0]).to.equal(user);
      });
    });
  });
});