'use strict';

define(['chai','messageController','connectionController'],function(chai,MessageController,ConnectionController) {

    return function() {
        var expect = chai.expect;

        describe("Message Controller", function () {

            describe("Constructor", function () {

                it("should set listener if provided", function () {
                    var listener = {};
                    var messageController = new MessageController(listener);
                    expect(messageController.listener).to.equal(listener);
                });

                it("should set a connectionController if provided", function () {
                    var listener = {};
                    var connectionController = new ConnectionController();
                    var messageController = new MessageController(listener, connectionController);
                    expect(messageController.connectionController).to.equal(connectionController);
                });
            });

            describe("#onMessageReceived", function () {
                var stubConnectionController;
                var stubListener;
                var messageController;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    messageController = new MessageController(stubListener, stubConnectionController);
                });

                it("#should send the message to the listener update method", function () {
                    var _message = "test";
                    stubListener.update = function (message) {
                        expect(message).to.equal(_message);
                    };
                    messageController.onMessageReceived(_message);
                });

            });

            describe("#setOnMessageReceivedEvent", function () {
                var stubConnectionController;
                var stubListener;
                var messageController;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    messageController = new MessageController(stubListener, stubConnectionController);
                });

                it("should set using it functions called onMessageReceived", function () {
                    messageController.onMessageReceived = function () {
                    };
                    stubConnectionController.setMessageReceivedEvent = function (event) {
                        expect(event).to.equal(messageController.onMessageReceived);
                    };
                    messageController.setOnMessageReceivedEvent();
                });
            });

            describe("#sendMessage", function () {
                var stubConnectionController;
                var stubListener;
                var messageController;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    messageController = new MessageController(stubListener, stubConnectionController);
                });

                it("should send the message to messageController", function () {
                    var _message = "test";
                    stubConnectionController.sendMessageEvent = function (message) {
                        expect(message).to.equal(_message);
                    };
                    messageController.sendMessageEvent(_message);
                });
            });
        });
    }
});

