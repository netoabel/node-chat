'use strict';

define(['chai','messenger','socketIoController'],function(chai,Messenger,ConnectionController) {

    return function() {
        var expect = chai.expect;

        describe("Message Controller", function () {

            describe("Constructor", function () {

                it("should set listener if provided", function () {
                    var listener = {};
                    var socketMessenger = new Messenger(listener);
                    expect(socketMessenger.listener).to.equal(listener);
                });
            });

            describe("#onMessageReceived", function () {

                it("should send the message to the listener 'update' method", function () {
                    var testMessage = "test";
                    var stubListener = {
                        update : function (message) {
                            expect(message).to.equal(testMessage);
                        }
                    };
                    var messenger = new Messenger(stubListener);

                    messenger.onMessageReceived(testMessage);
                });

            });

            describe("#sendMessage", function (message) {

            });
        });
    }
});

