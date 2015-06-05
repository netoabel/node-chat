'use strict';

var expect = require('chai').expect,
    MessageController = require('../../../lib/controller/messageController'),
    MessageHandler = require('../../../lib/model/service/messageHandler'),
    UserList = require('../../../lib/model/domain/userList'),
    User = require('../../../lib/model/domain/user');

describe('Given MessageController', function () {
  describe('#onChatMessage()', function () {
    var messageController, userId, message, userList, user, messageHandler;
    beforeEach(function () {
      userId = '1';
      message = 'test message';
      userList = new UserList();
      user = new User({userId: userId, name: 'test user', connectionId: '1'});
      userList.add(user);
      messageHandler = new MessageHandler(userList);
      messageController = new MessageController(messageHandler);
    });

    describe('With valid user id and message text', function () {
      it('should broadcast the given message', function (done) {
        messageController.broadcast = function (msg) {
          expect(msg.getText()).to.be.equal(message);
          done();
        };
        messageController.onChatMessage(message, userId);
      });

      it('should broadcast the message with the given user\'s username', function (done) {
        messageController.broadcast = function (msg) {
          expect(msg.getUserName()).to.be.equal(user.getName());
          done();
        };
        messageController.onChatMessage(message, userId);
      });
    });
  });
});