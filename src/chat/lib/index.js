'use strict';

var StubUserDAO = require('./model/dal/stubUserDAO.js'),
    UserDAO = require('./model/dal/userDAO'),
    User = require('./model/domain/user'),
    UserList = require('./model/domain/userList'),

    SocketioConnection = require('./model/transport/socketioConnection'),
    ConnectionController = require('./controller/connectionController'),
    UserHandler = require('./model/service/userHandler'),

    SocketioMessenger = require('./model/transport/socketioMessenger'),
    MessageController = require('./controller/messageController'),
    Messenger = require('./model/service/messageHandler'),

    userList = new UserList(),

    messenger = new Messenger(userList),
    messageController = new MessageController(messenger),
    socketioMessenger = new SocketioMessenger(messageController),

    userDAO = new UserDAO(),
    stubUserDAO = new StubUserDAO(userDAO),

    userHandler = new UserHandler(userList, userDAO),
    connectionController = new ConnectionController(userHandler),
    socketioConnection = new SocketioConnection(socketioMessenger, connectionController);

stubUserDAO.init();
socketioConnection.init();

socketioConnection.startServer(3000, function (io) {
  socketioMessenger.init(io);
  console.log('Chat server listening for connections on port 3000.');
});