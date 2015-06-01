/**
 * Created by buyttle-cesar on 20/05/15.
 */
'use strict';

require(['chai','jquery','chatView','messenger'],function(chai,$,ChatView,Messenger){

        var expect = chai.expect;

        describe("Chat view",function(){
            describe("#Constructor",function(){
                it("should set the provided messenger",function(){
                    var messenger = new Messenger();
                    var chatView = new ChatView(messenger);

                    expect(chatView.messenger).to.deep.equal(messenger);

                });
                it("should set the provided messagesUl",function(){
                    var messagesUl  = $('<ul>');
                    var messenger = new Messenger();
                    var chatView = new ChatView(messenger,messagesUl);

                    expect(chatView.messagesUl).to.deep.equal(messagesUl);
                });
            });

            describe("#registerInputField", function () {
                it("should set a event to send the message in the field to messenger when enter is pressed",function(){
                    var testText ='test';
                    var input = $('<input>').attr({
                        type:'text',
                        value:testText
                    });
                    var messenger = new Messenger();
                    messenger.send = function (message) {
                        expect(message).to.be.equal(testText);
                    };
                    var messageUl = $('<ul>');
                    var chatView  = new ChatView(messenger,messageUl);
                    chatView.registerInputField(input);

                    var e = $.Event("keydown");
                    e.keyCode = 13;
                    input.trigger(e);
                });
            });

            describe("#update", function () {
                it("should add a li in the messagesUl",function(){
                    var messageUl = $('<ul>');
                    var messenger = new Messenger();
                    var chatView  = new ChatView(messenger,messageUl);

                    var message = {
                        nickname: "test",
                        text:"test"
                    };

                    chatView.update(message);
                    expect(messageUl.children().length).to.equal(1);
                });
            });
        });

});
