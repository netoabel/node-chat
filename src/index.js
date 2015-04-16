var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//TODO: Do a research about existing solutions
//TODO: Use cases diagram
//TODO: Integrate with the logon web services
//TODO: Do it using TDD

app.use(express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

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
  console.log('Server is listening on port 3000');
});