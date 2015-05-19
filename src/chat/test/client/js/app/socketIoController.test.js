"use strict";


define(['chai','socketIoController'],function(chai,ScocketIoController) {
    return  function() {
        var expect = chai.expect;
        describe("Connection  Controller", function () {

            describe("Constructor", function () {

                it("should set a Io class if provided", function () {
                    var io = {connect: "fake"};
                    var socketIoController = new ScocketIoController(io);
                    expect(socketIoController.io).to.deep.equal(io)
                });

                it("should have a null socket", function () {
                    var socketIoController = new ScocketIoController();
                    expect(socketIoController.socket).to.be.null;
                });
            });

            describe("#startConnection", function () {

                it("should create a connection with the URL provided", function () {
                    var fakeUri = 'localhost';
                    var stubIo = {
                        connect: function (uri) {
                            expect(uri).to.equal(fakeUri);
                        }
                    };
                    var socketIoController = new ScocketIoController(stubIo);
                    socketIoController.startConnection(fakeUri);
                });

                it("should set the socket", function () {
                    var fakeSocket = {};
                    var stubIo = {
                        connect: function (uri) {
                            return fakeSocket
                        }
                    };
                    var socketIoController = new ScocketIoController(stubIo);
                    socketIoController.startConnection("localhost");
                    expect(socketIoController.socket).to.deep.equal(fakeSocket)

                });
            });

            describe("#isConnected", function () {

                it("should return false if socket is null", function () {
                    var socketIoController = new ScocketIoController();
                    expect(socketIoController.isConnected()).to.be.false;
                });

                it("should return false if socket isn't connected", function () {
                    var fakeSocket = {connected: false};
                    var stubIo = {
                        connect: function (uri) {
                            return fakeSocket
                        }
                    };
                    var socketIoController = new ScocketIoController(stubIo);
                    socketIoController.startConnection("localhost");

                    expect(socketIoController.isConnected()).to.be.false;

                });

                it("should return true if socket is connected", function () {
                    var fakeSocket = {connected: true};
                    var stubIo = {
                        connect: function (uri) {
                            return fakeSocket
                        }
                    };
                    var socketIoController = new ScocketIoController(stubIo);
                    socketIoController.startConnection("localhost");

                    expect(socketIoController.isConnected()).to.be.ok;
                })
            });

            describe("#setMessageReceivedEvent", function () {
                var socketIoController;

                beforeEach(function () {
                    var stubSocket = {
                        on: function (params) {
                        },
                        connected: true
                    };
                    var stubIo = {
                        connect: function (uri) {
                            return stubSocket
                        }
                    };
                    socketIoController = new ScocketIoController(stubIo);
                });

                it("should thrown error if isn't connected", function () {
                    expect(function () {
                        socketIoController.setMessageReceivedEvent(function () {
                        })
                    }).to.throw(Error);
                });

                it("should thrown error if the event isn't a function", function () {
                    socketIoController.startConnection("localhost");
                    expect(function () {
                        socketIoController.setMessageReceivedEvent();
                    }).to.throw(Error);
                });

                it("should set 'chat-message' event", function () {
                    socketIoController.startConnection("localhost");
                    socketIoController.socket.on = function (event, action) {
                        expect(event).to.deep.equal("chat-message")
                    };
                    socketIoController.setMessageReceivedEvent(function () {
                    });
                });

                it("should set the action in the event", function () {
                    socketIoController.startConnection("localhost");
                    var fakeEvent = function () {
                    };
                    socketIoController.socket.on = function (event, action) {
                        expect(action).to.deep.equal(fakeEvent)
                    };
                    socketIoController.setMessageReceivedEvent(fakeEvent);
                });
            });

            describe("#sendMessageEvent", function () {
                var socketIoController;

                beforeEach(function () {
                    var stubSocket = {
                        emit: function (params) {
                        },
                        connected: true
                    };
                    var stubIo = {
                        connect: function (uri) {
                            return stubSocket
                        }
                    };
                    socketIoController = new ScocketIoController(stubIo);
                });

                it("should thrown error if isn't connected", function () {
                    expect(function () {
                        socketIoController.sendMessageEvent("test")
                    }).to.throw(Error);
                });

                it("should thrown error if the message doesn't exist", function () {
                    socketIoController.startConnection("localhost");
                    expect(function () {
                        socketIoController.sendMessageEvent();
                    }).to.throw(Error);
                });

                it("should send 'chat-message' event", function () {
                    socketIoController.startConnection("localhost");
                    socketIoController.socket.emit = function (event, message) {
                        expect(event).to.deep.equal("chat-message");
                    };
                    socketIoController.sendMessageEvent("test");
                });

                it("should send the message in the event", function () {
                    socketIoController.startConnection("localhost");
                    socketIoController.socket.emit = function (event, message) {
                        expect(message).to.deep.equal("test");
                    };
                    socketIoController.sendMessageEvent("test");
                });
            });
        });
    }
});

