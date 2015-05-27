'use strict';

var expect = require('chai').expect,
    MessageDAO = require('../../../lib/model/dal/message.dao.js'),
    User = require('../../../lib/model/user.js');

describe('Given MessageDAO', function () {
  describe('#onMessageReceived()', function () {
    var messageDAO, user, message;
    beforeEach(function () {
      user = new User({userId:'1', name: 'test user'});
      message = 'test message';
      messageDAO = new MessageDAO();
    });

    describe('With valid user and message', function () {
      it('should broadcast the given message', function (done) {
        messageDAO.broadcast = function (msg) {
          expect(msg.getText()).to.be.equal(message);
          done();
        };
        messageDAO.onMessageReceived(user, message);
      });

      it('should broadcast the message with the given user\'s username', function (done) {
        messageDAO.broadcast = function (msg) {
          expect(msg.getUserName()).to.be.equal(user.getName());
          done();
        };
        messageDAO.onMessageReceived(user, message);
      });
    });

    describe('With a message that have html and/or javascript content', function () {
      it('should sanitize the message before broadcasting it', function (done) {
        message = "<script type='text/javascript'>alert('test')</script>";
        messageDAO.broadcast = function (msg) {
          expect(msg.message).to.not.contain("<");
          expect(msg.message).to.not.contain(">");
          expect(msg.message).to.not.contain("'");
          expect(msg.message).to.not.contain('"');
          done();
        };
        messageDAO.onMessageReceived(user, message);
      });
    });

    describe('With a message that exceeds 140 characters', function () {
      it('should broadcast only the first 140 characters of the message', function (done) {
        message = "This message contains more than 140 characters. Please be more concise and use less words to say " +
                  "what you want to say. Otherwise, we will cut your message.";
        messageDAO.broadcast = function (msg) {
          expect(msg.getText()).length.to.be.at.most(140);
          done();
        };
        messageDAO.onMessageReceived(user, message);
      });
    });
  });
});