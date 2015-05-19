"use strict";

require.config({
    shim: {
        'mocha': {
            exports: 'mocha'
        }
    },
    baseUrl: 'js/',

    paths: {

        //libs
        jquery: 'library/jquery-2.1.3.min',
        chai:'library/chai',

        //tests
        socketIoControllerTests: 'app/socketIoController.test',
        socketMessengerTests: 'app/socketMessenger.test',

        //app
        socketIoController:'../../../public/js/app/socketIoController',
        socketMessenger:'../../../public/js/app/socketMessenger',
        connectionController:'../../../public/js/app/connectionController',
        messengerController:'../../../public/js/app/messageController'
    },

    priority:[
        'jquery'
    ]
});

mocha.setup({
    ui:'bdd',
    ignoreLeaks: true
});

