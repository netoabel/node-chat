'use strict';

var expect = require('chai').expect,
    UserList = require('../../lib/model/user-list.js'),
    User = require('../../lib/model/user.js');

describe('Given UserList', function () {
  describe('#add()', function () {
    describe('With a valid user', function () {
      it('should add it to the users list', function () {
        var userList = new UserList();
        var user = new User('username');
        userList.add(user);

        expect(userList.users).to.contain(user);
      });
    });

    describe('With a user that doesn\'t have a name', function () {
      it('should not add it to the users list', function () {
        var userList = new UserList();
        var user = new User();
        userList.add(user);

        expect(userList.users).to.not.contain(user);
      });
    });

    describe('With no user', function () {
      it('should not add it to the users list', function () {
        var userList = new UserList();
        userList.add();

        expect(userList.users).to.be.empty;
      });
    });
  });
});