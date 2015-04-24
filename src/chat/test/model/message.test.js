'use strict';

var expect = require('chai').expect,
    should = require('chai').should(),
    Message = require('../../lib/model/message.js');

describe('Given Message', function () {
  describe('#isValid()', function () {
    describe('With a valid message', function () {
      it('should return true', function () {
        var message = new Message({
          time: new Date(),
          user: ''
        });
        expect(message.isValid()).to.be.true;
      });
    });
  });
});