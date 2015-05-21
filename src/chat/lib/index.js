'use strict';

var http = require('http').Server();
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.broadcast.emit('chat-message', 'New user connected');
  console.log('user connected');

  socket.on('chat-message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat-message', msg);
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('chat-message', 'User disconnected');
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('WebSocket server listening for connections on port 3000');
});