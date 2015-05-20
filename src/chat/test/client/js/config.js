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
        messengerTests: 'app/messenger.test',

        //app
        socketIoController:'../../../public/js/app/socketIoController',
        messenger:'../../../public/js/app/messenger',
        connectionInterface:'../../../public/js/app/connectionInterface',
        messengerInterface:'../../../public/js/app/messengerInterface'
    },

    priority:[
        'jquery'
    ]
});

mocha.setup({
    ui:'bdd',
    ignoreLeaks: true
});

