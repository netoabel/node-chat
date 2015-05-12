"use strict";

var expect = chai.expect;

describe("Connection  Controller",function(){

    describe("Constructor",function(){

        it("should have a default Io class",function(){
            var connectionController = new ConnectionController();
            expect(connectionController.io).to.deep.equal(io);
        });

        it("should set a Io class if provided",function(){
            var io = {connect:"fake"};
            var connectionController = new ConnectionController(io);
            expect(connectionController.io).to.deep.equal(io)
        });

        it("should have a null socket",function(){
            var connectionController = new ConnectionController();
            expect(connectionController.socket).to.be.null;
        });
    });

    describe("#startConnection",function(){

        it("should create a connection with the URL provided", function () {
            var fakeUri = 'localhost';
            var stubIo = {
                connect: function(uri){
                    expect(uri).to.equal(fakeUri);
                }
            };
            var connectionController = new ConnectionController(stubIo);
            connectionController.startConnection(fakeUri);
        });

        it("should set the socket",function(){
            var fakeSocket = {test:"uriadksahdlsaldhsla"};
            var stubIo = {
                connect: function(uri){
                    return fakeSocket
                }
            };
            var connectionController = new ConnectionController(stubIo);
            connectionController.startConnection("localhost");
            expect(connectionController.socket).to.deep.equal(fakeSocket)

        });
    });



    describe("#setMessageReceivedEvent",function(){
        var connectionController;

        beforeEach(function () {
            var stubSocket = {
                on: function(params){}
            };
            var stubIo = {
                connect: function (uri) {
                    return stubSocket
                }
            };
            connectionController = new ConnectionController(stubIo);
        });

        it("should thrown error if isn't connected", function () {
            expect(function(){
                connectionController.setMessageReceivedEvent(function(){})
            }).to.throw(Error);
        });

        it("should thrown error if the event isn't a function", function () {
            connectionController.startConnection("localhost");
            expect(function(){
                connectionController.setMessageReceivedEvent();
            }).to.throw(Error);
        });

        it("should set 'chat-message' event", function () {
            connectionController.startConnection("localhost");
            connectionController.socket.on = function(event,action){
                expect(event).to.deep.equal("chat-message")
            };
            connectionController.setMessageReceivedEvent(function () {});
        });

        it("should set the action in the event", function () {
            connectionController.startConnection("localhost");
            var fakeEvent = function(){};
            connectionController.socket.on = function(event,action){
                expect(action).to.deep.equal(fakeEvent)
            };
            connectionController.setMessageReceivedEvent(fakeEvent);
        });
    });

    describe("#sendMessageEvent",function(){
        var connectionController;

        beforeEach(function () {
            var stubSocket = {
                emit: function(params){}
            };
            var stubIo = {
                connect: function (uri) {
                    return stubSocket
                }
            };
            connectionController = new ConnectionController(stubIo);
        });

        it("should thrown error if isn't connected", function () {
            expect(function(){
                connectionController.sendMessageEvent("test")
            }).to.throw(Error);
        });

        it("should thrown error if the message doesn't exist", function () {
            connectionController.startConnection("localhost");
            expect(function(){
                connectionController.sendMessageEvent();
            }).to.throw(Error);
        });

        it("should send 'chat-message' event", function () {
            connectionController.startConnection("localhost");
            connectionController.socket.emit = function(event,message){
                expect(event).to.deep.equal("chat-message");
            };
            connectionController.sendMessageEvent("test");
        });

        it("should send the message in the event", function () {
            connectionController.startConnection("localhost");
            connectionController.socket.emit = function(event,message){
                expect(message).to.deep.equal("test");
            };
            connectionController.sendMessageEvent("test");
        });
    });
});