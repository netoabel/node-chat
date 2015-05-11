'use strict';

var expect = require('chai').expect,
    User = require('../../lib/model/user.js');

describe('Given User', function () {
  describe('#isValid()', function () {
    describe('Within a valid user', function () {
      it('should return true', function () {
        var user = new User({name: 'username', userId:'1'});

        expect(user.isValid()).to.be.true;
      });
    });

    describe('Within an user that doesn\'t have a name', function () {
      it('should return false', function () {
        var user = new User({id: '1'});

        expect(user.isValid()).to.not.be.true;
      });
    });

    describe('Within an user that doesn\'t have an userId', function () {
      it('should return false', function () {
        var user = new User({name: 'User'});

        expect(user.isValid()).to.not.be.true;
      });
    });

    describe('Within an empty user', function () {
      it('should return false', function () {
        var user = new User();

        expect(user.isValid()).to.not.be.true;
      });
    });

  });
});