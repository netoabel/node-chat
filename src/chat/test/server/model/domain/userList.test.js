'use strict';

var expect = require('chai').expect,
    UserList = require('../../../../lib/model/domain/userList.js'),
    User = require('../../../../lib/model/domain/user.js');

describe('Given UserList', function () {
  describe('#add()', function () {
    var userList;

    beforeEach(function () {
      userList = new UserList();
    });

    describe('With a valid user', function () {
      it('should add it to the users list', function () {
        var user = new User({connectionId: '1', name: 'username', userId: '1'});
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

    describe('With a valid user that has a connection id that is already in the list', function () {
      it('should replace the existing user', function () {
        var user1 = new User({connectionId: '1', name: 'username1', userId: '1'});
        var user2 = new User({connectionId: '1', name: 'username2', userId: '2'});
        userList.add(user1);
        userList.add(user2);
        expect(userList.getList()).to.have.length(1);
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

    describe('With a valid user id', function () {
      it('should remove the corresponding user from users list', function () {
        userList.add(user);
        userList.remove({userId: existingUserId});

        expect(userList.getList()).to.be.empty;
      });
      it('should remove only one user from users list', function () {
        var user1 = new User({connectionId: '1', name: 'username1', userId: '1'});
        var user2 = new User({connectionId: '2', name: 'username2', userId: '1'});
        userList.add(user1);
        userList.add(user2);
        userList.remove({userId: '1'});

        expect(userList.getList()).to.have.length(1);
      });
    });

    describe('With a user id that isn\'t being used by any user', function () {
      it('shouldn\'t remove anything from the user list', function () {
        userList.add(user);
        userList.remove({userId: 'invalid user id'});

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
    var userList, existingUserId, user, existingConnectionId;

    beforeEach(function () {
      userList = new UserList();
      existingUserId = '1';
      existingConnectionId = '2';
      user = new User({name: 'username', userId: existingUserId, connectionId: existingConnectionId});
      userList.add(user);
    });

    describe('With an existing userId', function () {
      it('should return a user', function () {
        expect(userList.get({userId: existingUserId})).to.be.instanceOf(User);
      });

      it('should return a user with the given userId', function () {
        expect(userList.get({userId: existingUserId}).getUserId()).to.be.equal(existingUserId);
      });
    });

    describe('With an existing connectionId', function () {
      it('should return a user', function () {
        expect(userList.get({connectionId: existingConnectionId})).to.be.instanceOf(User);
      });

      it('should return a user with the given connectionId', function () {
        expect(userList.get({connectionId: existingConnectionId}).getConnectionId()).to.be.equal(existingConnectionId);
      });
    });

    describe('With an non existent userId', function () {
      it('should return undefined', function () {
        expect(userList.get({userId: '123'})).to.be.undefined;
      });
    });

    describe('With no userId', function () {
      it('should return undefined', function () {
        expect(userList.get()).to.be.undefined;
      });
    });
  });
});