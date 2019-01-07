let socket = io(); //initialize the request and keep the connection opened

socket.on('connect',function () {
    console.log("Connected to server");

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('Got New Message! ',data);
});

