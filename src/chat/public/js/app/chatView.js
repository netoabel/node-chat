/**
 * Created by buyttle-cesar on 20/05/15.
 */
'use strict';

define(['jquery'] ,function($){

    function ChatView(messenger,messagesUl){
        this.messenger = messenger;
        this.messagesUl = messagesUl;

        messenger.registerObserver(this);
    }

    ChatView.prototype = {
        constructor: ChatView,

        update: function(message){
            var messageLi = $('<li>');
            var messageSpan = $('<span>');

            messageSpan.text("[" + this.getCurrentHourAndMinute() + "]");
            messageSpan.append($('<b>').text(message.nickname));
            messageLi.append(messageSpan);
            messageLi.append(" " + message.text);
            this.messagesUl.append(messageLi);
        },

/*        isMessageValid: function (text){
            return text.replace(/\s/g, '').length;
        },*/

        registerInputField: function(field){
            var self = this;
            field.keydown(function(event) {
                if(event.keyCode === 13) {
                    var message = $(this).val();
                    $(this).val('');
                    if (message) {
                        self.messenger.send(message);
                    }
                }
            });
        },

       getCurrentHourAndMinute: function () {
            var currentDate = new Date();
            return ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2)
        }
    };

    return ChatView;
});