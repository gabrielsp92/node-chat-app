const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

//config http server and socketIO
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('new user connected');


    socket.emit('newMessage',generateMessage(
        'Admin',
        'Welcome to the chat app'
    ));

    socket.broadcast.emit('newMessage',generateMessage(
        'Admin',
        'New user joined'
    ));


    socket.on('createMessage', (data, callback) => {
        //socket.emit emit events to current connected client
        //io.emit broadcasts events to all connected clients
        //socket.broadcast.emit to every connection but the emitter one
        io.emit('newMessage',generateMessage(
            data.from, data.text
        ));
        //aknowlegments
        callback('this is from the server');
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('User',coords.latitude, coords.longitude));
    })

    socket.on('disconnect',function() {
        console.log('Client disconnected from the server')
    })
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
})

