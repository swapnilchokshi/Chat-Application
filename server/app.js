const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser);
port = 3000;

const server = app.listen(port, () => {
    console.log('Server started in port 3000.');
});

const io = socket(server);


io.on('connection', (socket)=>{

    socket.on('message', function(data){

      io.emit('new message', {user:data.user, message:data.message});
      console.log(data.user + ' messaged :- ' + data.message);
    })
  });
