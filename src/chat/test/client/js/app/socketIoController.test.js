"use strict";


define(['chai','socketIoController','messengerInterface'],function(chai,SocketIoController,Messenger) {
    return  function() {
        var expect = chai.expect;
        describe("Connection  Controller", function () {

            describe("Constructor", function () {

                it("should set a Io class if provided", function () {
                    var io = {connect: "fake"};
                    var socketIoController = new SocketIoController(io);
                    expect(socketIoController.io).to.deep.equal(io)
                });

                it("should have a null socket", function () {
                    var socketIoController = new SocketIoController();
                    expect(socketIoController._socket).to.be.null;
                });
            });

            describe("#startConnection", function () {

                it("should create a connection with the URL provided", function () {
                    var fakeUri = 'localhost';
                    var stubIo = {
                        connect: function (uri,query) {
                            expect(uri).to.equal(fakeUri);
                        }
                    };
                    var socketIoController = new SocketIoController(stubIo);
                    socketIoController.startConnection(fakeUri);
                });

                it("should send a object with the userId", function () {
                    var fakeUri = 'localhost';
                    var fakeId = '123';
                    var stubIo = {
                        connect: function (uri,parameter) {
                            expect(parameter.query).to.equal(fakeId);
                        }
                    };
                    var socketIoController = new SocketIoController(stubIo);
                    socketIoController.startConnection(fakeUri,fakeId);
                });

                it("should set the socket", function () {
                    var stubSocket = {};
                    var stubIo = {
                        connect: function (uri) {
                            return stubSocket
                        }
                    };
                    var socketIoController = new SocketIoController(stubIo);
                    socketIoController.startConnection("localhost");
                    expect(socketIoController._socket).to.deep.equal(stubSocket)

                });
            });

            describe("#isConnected", function () {

                it("should return false if socket is null", function () {
                    var socketIoController = new SocketIoController();
                    expect(socketIoController.isConnected()).to.be.false;
                });

                it("should return false if socket isn't connected", function () {
                    var stubSocket = {connected: false};
                    var stubIo = {
                        connect: function (uri) {
                            return stubSocket
                        }
                    };
                    var socketIoController = new SocketIoController(stubIo);
                    socketIoController.startConnection("localhost");

                    expect(socketIoController.isConnected()).to.be.false;

                });

                it("should return true if socket is connected", function () {
                    var stubSocket = {connected: true};
                    var stubIo = {
                        connect: function (uri) {
                            return stubSocket
                        }
                    };
                    var socketIoController = new SocketIoController(stubIo);
                    socketIoController.startConnection("localhost");

                    expect(socketIoController.isConnected()).to.be.ok;
                })
            });

            describe("#registerMessenger",function(){
                var stubSocket,socketIoController, messenger;

                beforeEach(function () {
                    messenger = Object.create(Messenger);
                    stubSocket =  {
                        on: function(){},
                        emit: function(){},
                        connected: true
                    };
                    var stubIo = {
                        connect: function(){
                            return stubSocket;
                        }
                    };
                    socketIoController = new SocketIoController(stubIo);
                });

                it("should throw a error if socket is disconnected",function(){
                    expect(function(){
                        socketIoController.registerMessenger();
                    }).to.throw('socket is disconnected');

                });

                it("should set in socket  a 'chat-message' event",function(done){

                    stubSocket.on = function(event,listener){
                        expect(event).to.equal("chat-message");
                        done();
                    };
                    socketIoController.startConnection();

                    socketIoController.registerMessenger(messenger);
                });

                it("should set in socket the messenger onMessageReceived event",function(done){
                    stubSocket.on = function(event,messageReceived){
                        messageReceived();
                    };
                    messenger.onMessageReceived = function(){
                      done();
                    };
                    socketIoController.startConnection();


                    socketIoController.registerMessenger(messenger);
                });

                it("should overwrite the messenger base function 'sendMessage'", function () {
                    var baseFunction = messenger.sendMessage;
                    socketIoController.startConnection();
                    socketIoController.registerMessenger(messenger);

                    expect(messenger.sendMessage).to.not.equal(baseFunction);
                });

                it("should send the message to the base function", function (done) {
                    var testMessage = "test";
                    messenger.sendMessage = function(msg){
                        expect(msg).to.equal(testMessage);
                        done();
                    };
                    socketIoController.startConnection();
                    socketIoController.registerMessenger(messenger);

                    messenger.sendMessage(testMessage);
                });

                it("should in the overwrite function emit to socket a 'chat-message' event", function (done) {
                    var testMessage = "test";
                    stubSocket.emit = function(event,msg){
                        expect(event).to.equal("chat-message");
                        done();
                    };
                    socketIoController.startConnection();
                    socketIoController.registerMessenger(messenger);

                    messenger.sendMessage(testMessage);
                });

                it("should in the overwrite function emit to socket the message", function (done) {
                    var testMessage = "test";
                    stubSocket.emit = function(event,msg){
                        expect(msg).to.equal(testMessage);
                        done();
                    };
                    socketIoController.startConnection();
                    socketIoController.registerMessenger(messenger);

                    messenger.sendMessage(testMessage);
                });

            });

        });
    }
});

