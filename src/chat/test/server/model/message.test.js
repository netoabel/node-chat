'use strict';

var expect = require('chai').expect,
    Message = require('../../../lib/model/message.js');

describe('Given Message', function () {
  describe('#sanitize()', function () {
    describe('Within a message that has html/javascript content in it', function () {
      it('should sanitize the message', function () {
        var message = new Message({
          username: 'test user',
          text: "<script type='text/javascript'>alert('test')</script>"
        });
        message.sanitize();
        expect(message.getText()).to.not.contain("<");
        expect(message.getText()).to.not.contain(">");
        expect(message.getText()).to.not.contain("'");
        expect(message.getText()).to.not.contain('"');
      });
    });
  });

  describe('#limitSize()', function () {
    describe('Within a message that exceeds the size limit', function () {
      it('should limit the message text to the size limit', function () {
        var message = new Message({
          username: 'test user', text: "This message contains more than 140 characters. " +
          "Please be more concise and use less words to say what you want to say. Otherwise, we will cut your message."
        });
        message.limitSize();
        expect(message.getText().length).to.be.at.most(140);
      });
    });
  });
});