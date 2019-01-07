let socket = io(); //initialize the request and keep the connection opened
socket.on('connect',function () {
    console.log("Connected to server");

    socket.emit('createMessage',{
        from: 'joseph@example.com',
        text: 'Hey, this is gables'
    });
    
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('Got New Message! ',data);
});

