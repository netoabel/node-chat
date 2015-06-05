'use strict';

var expect = require('chai').expect,
    Message = require('../../../../lib/model/view/message');

describe('Given Message', function () {
  describe('#sanitize()', function () {
    describe('Within a message that has a javascript alert() in it', function () {
      it('should sanitize the message', function () {
        var text = "<script type='text/javascript'>alert('test')</script>";
        var message = new Message({
          username: 'test user',
          text: text
        });

        message.sanitize();

        expect(message.getText()).to.not.contain(text);
      });
    });

    describe('Within a message that tries to make a text bold', function () {
      it('should sanitize the message', function () {
        var text = "<strong>I'm Strong!</strong>";
        var message = new Message({
          username: 'test user',
          text: text
        });

        message.sanitize();

        expect(message.getText()).to.not.contain(text);
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