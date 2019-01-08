let socket = io(); //initialize the request and keep the connection opened

socket.on('connect',function () {
    console.log("Connected to server");

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Got New Message! ',message);

    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
   
});

socket.on('welcomeToChat',function(data) {
    console.log(data);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();


    socket.emit('createMessage',{
        from: 'User',
        text: $('#message').val()
    }, function(){

    })
});