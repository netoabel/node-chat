var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {

  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths:{

    //libs
    jquery: 'js/lib/jquery-2.1.3.min',
    chai:'js/lib/chai',

    //app
    socketIoController:'js/app/socketIoController',
    messenger:'js/app/messenger',
    chatView:'js/app/chatView'

  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback:function() {
    setTimeout(function() {
      window.__karma__.start()
    },1000);
  }
});


