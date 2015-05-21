'use strict';

var expect = require('chai').expect,
    UserList = require('../../../lib/model/user-list.js'),
    User = require('../../../lib/model/user.js');

describe('Given UserList', function () {
  describe('#add()', function () {
    var userList;

    beforeEach(function () {
      userList = new UserList();
    });

    describe('With a valid user', function () {
      it('should add it to the users list', function () {
        var user = new User({connectionId: '1', name: 'username', userId:'1'});
        userList.add(user);
        expect(userList.getList()).to.contain(user);
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
    var userList, existingUserId, existingConnectionId, user;

    beforeEach(function () {
      userList = new UserList();
      existingConnectionId = 'id';
      existingUserId = '2';
      user = new User({
        name: 'username',
        userId: existingUserId,
        connectionId: existingConnectionId
      });
    });

    describe('With an existing user id', function () {
      it('should remove the corresponding user from users list', function () {
        userList.add(user);
        userList.remove({userId: existingUserId});

        expect(userList.getList()).to.be.empty;
      });
    });

    describe('With an non existent user id', function () {
      it('should not remove any user from users list', function () {
        userList.add(user);
        userList.remove({userId: 'non existent id'});

        expect(userList.getList()).to.not.be.empty;
      });
    });

    describe('With a valid connection id', function () {
      it('should remove the corresponding user from users list', function () {
        userList.add(user);
        userList.remove({connectionId: existingConnectionId});

        expect(userList.getList()).to.be.empty;
      });
    });

    describe('With a connection id that isn\'t being used by any user', function () {
      it('shouldn\'t remove anything from the user list', function () {
        userList.add(user);
        userList.remove({connectionId: 'invalid connection id'});

        expect(userList.getList()).to.not.be.empty;
      });
    });

    describe('When the user list is empty', function () {
      it('should keep it empty', function () {
        userList.remove({userId: existingUserId});

        expect(userList.getList()).to.be.empty;
      });
    });
  });

  describe('#get()', function () {
    var userList, existingUserId, user;

    beforeEach(function () {
      userList = new UserList();
      existingUserId = '1';
      user = new User({name: 'username', userId: existingUserId});
      userList.add(user);
    });

    describe('With an existing userId', function () {
      it('should return a user', function () {
        expect(userList.get(existingUserId)).to.be.instanceOf(User);
      });

      it('should return a user with the given userId', function () {
        expect(userList.get(existingUserId).getUserId()).to.be.equal(existingUserId);
      });
    });

    describe('With an non existent userId', function () {
      it('should return undefined', function () {
        expect(userList.get('123')).to.be.undefined;
      });
    });

    describe('With no userId', function () {
      it('should return undefined', function () {
        expect(userList.get()).to.be.undefined;
      });
    });
  });
});