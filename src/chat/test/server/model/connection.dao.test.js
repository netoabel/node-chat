'use strict';

var expect = require('chai').expect,

    ConnectionDAO = require('../../../lib/model/dal/connection.dao.js'),

    StubUserDAO = require('./../../../lib/model/dal/stub/stub-user.dao.js'),
    UserDAO = require('./../../../lib/model/dal/user.dao.js'),

    User = require('../../../lib/model/user'),
    UserList = require('../../../lib/model/user-list');

describe('Given ConnectionDAO', function () {
  var userList, userDAO, stubUserDAO, connectionDAO, stubList;

  beforeEach(function () {
    userList = new UserList();
    userDAO = new UserDAO();
    stubUserDAO = new StubUserDAO();
    connectionDAO = new ConnectionDAO(userList, userDAO);

    stubList = [];
    userList.add = function (data) {
      stubList.push(data);
    };
    userList.remove = function (data) {
      stubList.pop();
    };

    stubUserDAO.setup(userDAO);
  });

  describe('#connect()', function () {
    describe('With valid user id and connection id', function () {
      it('should add a user to the user list', function (done) {
        connectionDAO.connect({userId: '1', connectionId: '2'}, function () {
          expect(stubList).to.not.be.empty;
          expect(stubList[0]).to.be.instanceOf(User);
          done();
        });
      });

      it('should add a user with the given user id to the user list', function (done) {
        connectionDAO.connect({userId: '1', connectionId: '2'}, function () {
          expect(stubList[0].getUserId()).to.equal('1');
          done();
        });
      });

      it('should add a user with the given connection id to the user list', function (done) {
        connectionDAO.connect({userId: '1', connectionId: '2'}, function () {
          expect(stubList[0].getConnectionId()).to.equal('2');
          done();
        });
      });

      it('should result in a user', function (done) {
        connectionDAO.connect({userId: '1', connectionId: '2'}, function (user) {
          expect(user).to.be.instanceOf(User);
          done();
        });
      });
    });

    describe('With an inexistent user id', function () {
      it('should\'nt add anything to the user list', function (done) {
        connectionDAO.connect({userId: 'inexistent user id', connectionId: '2'}, function () {
          expect(stubList).to.be.empty;
          done();
        });
      });
    });

    describe('With no user id', function () {
      it('should\'nt add anything to the user list', function (done) {
        connectionDAO.connect({connectionId: '2'}, function () {
          expect(stubList).to.be.empty;
          done();
        });
      });
    });

    describe('With no connection id', function () {
      it('should\'nt add anything to the user list', function (done) {
        connectionDAO.connect({userId: '1'}, function () {
          expect(stubList).to.be.empty;
          done();
        });
      });
    });
  });

  describe('#disconnect()', function () {
    describe('With a valid connection id', function () {
      it('should remove the corresponding user from the user list', function (done) {
        connectionDAO.connect({userId: '1', connectionId: '2'}, function () {
          connectionDAO.disconnect({connectionId: '2'}, function () {
            expect(stubList).to.be.empty;
            done();
          });
        });
      });
    });
  });
});