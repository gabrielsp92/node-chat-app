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

    //socket.emit emit events to current connection

    socket.on('createMessage', (data) => {
        data.createdAt = Date.now();
        //io.emit broadcasts events to all connections
        io.emit('newMessage',{
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        })
        console.log(data);
    })

    socket.on('disconnect',function() {
        console.log('Client disconnected from the server')
    })
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
})

