const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

//config http server and socketIO
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('new user connected');


    socket.emit('welcomeToChat',{
        from: 'Admin',
        text: 'Welcome to the chatApp!',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });


    socket.on('createMessage', (data) => {
        //socket.emit emit events to current connected client
        //io.emit broadcasts events to all connected clients
        //socket.broadcast.emit to every connection but the emitter one
    })

    socket.on('disconnect',function() {
        console.log('Client disconnected from the server')
    })
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
})

