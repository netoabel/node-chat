'use strict';

var http = require('http').Server(),
  io = require('socket.io')(http),

  ConnectionDAO = require('./model/dal/connection.dao'),
  SocketioConnectionDAO = require('./model/dal/socketio/socketio-connection.dao'),
  MessageDAO = require('./model/dal/message.dao'),
  SocketioMessageDAO = require('./model/dal/socketio/socketio-message.dao'),
  StubUserDAO = require('./model/dal/stub/stub-user.dao'),
  UserDAO = require('./model/dal/user.dao'),
  User = require('./model/user'),
  UserList = require('./model/user-list'),

  userList = new UserList(),
  userDAO = new UserDAO(),
  connectionDAO = new ConnectionDAO(userList, userDAO),
  messageDAO = new MessageDAO(),

  stubUserDAO = new StubUserDAO(userDAO),
  socketioConnectionDAO = new SocketioConnectionDAO(io, connectionDAO, messageDAO),
  socketioMessageDAO = new SocketioMessageDAO(io, messageDAO);

http.listen(3000, function () {
  console.log('WebSocket server listening for connections on port 3000');
});