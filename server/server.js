const express = require('express');
const http = require('http');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amuse');

var TextInput = require('./models/Test');

var port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  var thisID = socket.id;
  var newClient = new TextInput({
    socketID:thisID
  });
  io.emit('new client', {
    text:'new client!'
  });
  socket.on('eyes open', () => {
    socket.broadcast.emit('eyes open', {
      id:socket.id,
      text:'opened happened'
    });
  });
  socket.on('eyes close', () => {
    socket.broadcast.emit('eyes close', {
      id:socket.id,
      text:'closed happened'
    });
  });
  socket.on('new data', (doc) => {
    socket.emit('sending new data', {
      id:doc.id,
      dataset:doc.dataset
    });
  });
  socket.on('channel 1 data', (doc) => {
    socket.broadcast.emit('challen',{
      text:doc
    });
  })
});

const publicPath = path.join(__dirname, '/public');
app.use('/', express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.set('view engine','html');

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/api', (req,res) => {
  var inputText = req.body.text;
  console.log(req.body);
  var newInputText = new TextInput({
    text:inputText
  });

  newInputText.save();
  res.send('worked!');
});

app.set('view engine','hbs');

server.listen(port, () => {
  console.log("Port is up and running at",port);
});
