let socket = io(); //initialize the request and keep the connection opened

socket.on('connect',function () {
    console.log("Connected to server");

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Got New Message! ',message);

    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
   
});

socket.on('welcomeToChat',function(data) {
    console.log(data);
});

socket.on('newLocationMessage',function(message){
    const li = $('<li></li<');
    const a = $('<a target="_blank"> My current location </a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();


    socket.emit('createMessage',{
        from: 'User',
        text: $('#message').val()
    }, function(){

    })
});


const locationButton = $("#send-location");
locationButton.on('click',function () {
    //If browser doesnt support geolocation
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    //fetch location and emits to server if it works.
    navigator.geolocation.getCurrentPosition(function (position) {  
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function () {
        alert('unable to fetch location.');
    });
})