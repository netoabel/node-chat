'use strict';

define(['chai','socketMessenger','socketIoController'],function(chai,SocketMessenger,ConnectionController) {

    return function() {
        var expect = chai.expect;

        describe("Message Controller", function () {

            describe("Constructor", function () {

                it("should set listener if provided", function () {
                    var listener = {};
                    var socketMessenger = new SocketMessenger(listener);
                    expect(socketMessenger.listener).to.equal(listener);
                });

                it("should set a connectionController if provided", function () {
                    var listener = {};
                    var connectionController = new ConnectionController();
                    var socketMessenger = new SocketMessenger(listener, connectionController);
                    expect(socketMessenger.connectionController).to.equal(connectionController);
                });
            });

            describe("#onMessageReceived", function () {
                var stubConnectionController;
                var stubListener;
                var socketMessenger;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    socketMessenger = new SocketMessenger(stubListener, stubConnectionController);
                });

                it("#should send the message to the listener update method", function () {
                    var _message = "test";
                    stubListener.update = function (message) {
                        expect(message).to.equal(_message);
                    };
                    socketMessenger.onMessageReceived(_message);
                });

            });

            describe("#setOnMessageReceivedEvent", function () {
                var stubConnectionController;
                var stubListener;
                var socketMessenger;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    socketMessenger = new SocketMessenger(stubListener, stubConnectionController);
                });

                it("should set using it functions called onMessageReceived", function () {
                    socketMessenger.onMessageReceived = function () {
                    };
                    stubConnectionController.setMessageReceivedEvent = function (event) {
                        expect(event).to.equal(socketMessenger.onMessageReceived);
                    };
                    socketMessenger.setOnMessageReceivedEvent();
                });
            });

            describe("#sendMessage", function () {
                var stubConnectionController;
                var stubListener;
                var socketMessenger;

                beforeEach(function () {
                    stubConnectionController = new ConnectionController();
                    stubListener = {
                        update: function () {
                        }
                    };
                    socketMessenger = new SocketMessenger(stubListener, stubConnectionController);
                });

                it("should send the message to socketMessenger", function () {
                    var _message = "test";
                    stubConnectionController.sendMessageEvent = function (message) {
                        expect(message).to.equal(_message);
                    };
                    socketMessenger.sendMessageEvent(_message);
                });
            });
        });
    }
});

