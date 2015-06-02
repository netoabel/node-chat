'use strict';

var expect = require('chai').expect,
    Message = require('../../../../lib/model/view/message'),
    MessageHandler = require('../../../../lib/model/service/messageHandler'),
    UserList = require('../../../../lib/model/domain/userList'),
    User = require('../../../../lib/model/domain/user');

describe('Given MessageHandler', function () {
  describe('#createMessage()', function () {
    it('should result in a Message with the given text', function (done) {
      var userList = new UserList();
      var user = new User({userId:'2', name: 'test user', connectionId: '1'});
      var messageHandler = new MessageHandler(userList);

      userList.add(user);

      messageHandler.createMessage('Message text', '2', function (message) {
        expect(message).to.be.instanceOf(Message);
        expect(message.getText()).to.be.equal('Message text');
        done();
      });
    });
  });
});