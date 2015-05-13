'use strict';

var expect = chai.expect;

describe("Message Controller",function(){

    describe("Constructor",function(){

        it("should set listener if provided",function(){
            var listener = {};
            var messageController = new MessageController(listener);
            expect(messageController.listener).to.equal(listener);
        });

        it("should throw a error if listener isn't provided", function () {
            expect(function(){
                new MessageController();
            }).to.throw(Error);
        });

        it("should have a null connectionController",function(){
            var listener = {};
            var messageController = new MessageController(listener);
            expect(messageController.connectionController).to.be.null;
        });
    });

    describe("#setConnectionController",function(){
        var messageController;
        beforeEach(function () {
           var listerner = {
               update: function(msg){}
           };
           messageController
        });
    });
});

