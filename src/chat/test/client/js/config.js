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
        messageControllerTest: 'app/messageController.test',

        //app

        connectionController:'../../../public/js/app/socketIoController',
        messageController:'../../../public/js/app/messageController',
        connectionController:'../../../public/js/app/connectionController'
    },

    priority:[
        'jquery'
    ]
});

mocha.setup({
    ui:'bdd',
    ignoreLeaks: true
});

