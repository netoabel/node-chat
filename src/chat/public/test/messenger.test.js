'use strict';

require(['chai','messenger'],function(chai,Messenger) {

    //return function() {
        var expect = chai.expect;

        describe("Message Controller", function () {

            describe("Constructor", function () {

                it("should have a null observer ", function () {
                    var socketMessenger = new Messenger();
                    expect(socketMessenger.observer).to.be.null;
                });
            });

            describe("#onMessageReceived", function () {

                it("should send the message to the listener 'update' method", function (done) {
                    var testMessage = "test";
                    var stubListener = {
                        update : function (message) {
                          expect(message).to.equal(testMessage);
                          done()
                        }
                    };
                    var messenger = new Messenger();
                    messenger.setObserver(stubListener);
                    messenger.onMessageReceived(testMessage);
                });

            });

            describe("#sendMessage", function (message) {

            });
        });
    //}
});

