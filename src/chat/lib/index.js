'use strict';

var ConnectionDAO = require('./model/dal/connection.dao.js'),
    SocketioConnectionDAO = require('./model/dal/socketio/socketio-connection.dao.js'),

    MessageDAO = require('./model/dal/message.dao.js'),
    SocketioMessageDAO = require('./model/dal/socketio/socketio-message.dao.js'),

    StubUserDAO = require('./model/dal/stub/stub-user.dao.js'),
    UserDAO = require('./model/dal/user.dao.js'),

    User = require('./model/user'),
    UserList = require('./model/user-list'),

    userList = new UserList(),
    userDAO = new UserDAO(),
    stubUserDAO = new StubUserDAO(),
    connectionDAO = new ConnectionDAO(userList, userDAO),
    socketioConnectionDAO = new SocketioConnectionDAO(),
    messageDAO = new MessageDAO(userList, userDAO),
    socketioMessageDAO = new SocketioMessageDAO();

stubUserDAO.setup(userDAO);
socketioConnectionDAO.setup(connectionDAO, messageDAO);
socketioMessageDAO.setup(messageDAO);