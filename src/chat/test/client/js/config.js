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
        connectionControllerTest: 'app/connectionController.test',
        messageControllerTest: 'app/messageController.test',

        //app
        connectionController:'../../../public/js/app/connectionController',
        messageController:'../../../public/js/app/messageController'
    },

    priority:[
        'jquery'
    ]
});

mocha.setup({
    ui:'bdd',
    ignoreLeaks: true
});

