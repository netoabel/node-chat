/**
 * Created by buyttle-cesar on 20/05/15.
 */
'use strict';

define(['jquery'] ,function($){

    function ChatView(messenger,messagesUl){
        this.messenger = messenger;
        this.messagesUl = messagesUl;
    }

    ChatView.prototype = {
        constructor: ChatView,

        update: function(message){
            var messageLi = $('<li>');
            var messageSpan = $('<span>');

            messageSpan.text("[" + this.getCurrentHourAndMinute() + "] ");
            console.log(message)
            messageSpan.append($('<b>').text(message._username + " :"));
            messageLi.append(messageSpan);
            messageLi.append(" " + message._text);
            this.messagesUl.append(messageLi);
            this.messagesUl.parent().scrollTop(this.messagesUl.parent().prop("scrollHeight"));
        },

        /*isMessageValid: function (text){
            return text.replace(/\s/g, '').length;
        },*/

        registerInputField: function(field){
            var self = this;
            field.keydown(function(event) {
                if(event.keyCode === 13) {
                    var message = field.val();
                    field.val('');
                    if (message) {
                        self.messenger.sendMessage(message);
                    }
                }
            });
        },

        registerFocusOnEnter: function (context, item) {
          context.keydown(function (event) {
              if (event.keyCode === 13) {
                  if(!item.is(':focus')) {
                      item.focus();
                  }else{
                      item.blur();
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