'use strict';

var expect = require('chai').expect,
    UserList = require('../../lib/model/user-list.js'),
    User = require('../../lib/model/user.js');

describe('Given UserList', function () {
  describe('#add()', function () {
    var userList;

    beforeEach(function () {
      userList = new UserList();
    });

    describe('With a valid user', function () {
      it('should add it to the users list', function () {
        var user = new User({name: 'username', userId:'1'});
        userList.add(user);
        expect(userList.users).to.contain(user);
      });
    });

    describe('With an invalid user', function () {
      it('should not add it to the users list', function () {
        var user = new User({name: 'User'});
        userList.add(user);
        expect(userList.users).to.not.contain(user);
      });
    });

    describe('With value that is not an user', function () {
      it('should not add it to the users list', function () {
        userList.add("I'm not an user");
        expect(userList.users).to.be.empty;
      });
    });

    describe('With no user', function () {
      it('should not add it to the users list', function () {
        userList.add();
        expect(userList.users).to.be.empty;
      });
    });
  });

  describe('#remove()', function () {
    var userList, existingUserId, user;

    beforeEach(function () {
      userList = new UserList();
      existingUserId = 'id';
      user = new User({name: 'username', userId: existingUserId});
    });

    describe('With an existing user id', function () {
      it('should remove the corresponding user from users list', function () {
        userList.add(user);
        userList.remove(existingUserId);

        expect(userList.users).to.be.empty;
      });
    });

    describe('With an non existent user id', function () {
      it('should not remove any user from users list', function () {
        userList.add(user);
        userList.remove('non existent id');

        expect(userList.users).to.not.be.empty;
      });
    });

    describe('When the user list is empty', function () {
      it('should keep it empty', function () {
        userList.remove(existingUserId);

        expect(userList.users).to.be.empty;
      });
    });
  });

  describe('#getUserById()', function () {
    var userList, existingUserId, user;

    beforeEach(function () {
      userList = new UserList();
      existingUserId = '1';
      user = new User({name: 'username', userId: existingUserId});
      userList.add(user);
    });

    describe('With an existing userId', function () {
      it('should return a user', function () {
        expect(userList.getUserById(existingUserId)).to.be.instanceOf(User);
      });

      it('should return a new user', function () {
        expect(userList.getUserById(existingUserId)).to.not.be.equal(user);
      });

      it('should return a user with the given userId', function () {
        expect(userList.getUserById(existingUserId).userId).to.be.equal(existingUserId);
      });
    });

    describe('With an non existent userId', function () {
      it('should return undefined', function () {
        expect(userList.getUserById('123')).to.be.undefined;
      });
    });

    describe('With no userId', function () {
      it('should return undefined', function () {
        expect(userList.getUserById()).to.be.undefined;
      });
    });
  });
});