/**
 * Created by buyttle-cesar on 22/05/15.
 */

"use strict";

require.config({


    baseUrl: 'js/',

    paths: {

        //libs
        jquery: 'lib/jquery-2.1.3.min',
        socketIo: 'lib/socket.io',


        //app
        socketIoController:'app/socketIoController',
        messenger:'app/messenger',
        chatView:'app/chatView',
        connectionInterface:'app/connectionInterface',
        messengerInterface:'app/messengerInterface'
    },

    priority:[
        'jquery',
        'socketIo'
    ]
});


require(['jquery','socketIo','socketIoController','messenger','chatView'],
    function($,io,SocketIoController,Messenger,ChatView){
        var messageField = $('#message-field');
        var messageUl = $('#messages');

        var socketIoController = new SocketIoController(io);
        socketIoController.startConnection("localhost",$("#userID").val());

        var messenger = new Messenger();
        var chatView = new ChatView(messenger,messageUl);
        socketIoController.registerMessenger(messenger);
        chatView.registerInputField(messageField);

    });
