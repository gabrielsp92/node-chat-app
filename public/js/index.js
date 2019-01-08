const socket = io(); //initialize the request and keep the connection opened

socket.on('connect',function () {
    console.log("Connected to server");

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Got New Message! ',message);

    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.createdAt} : ${message.text}`);
    jQuery('#messages').append(li);
   
});


socket.on('newLocationMessage',function(message){
    const li = $('<li></li<');
    const a = $('<a target="_blank"> My current location </a>');
    li.text(`${message.from}: ${message.createdAt}`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    //select input from index.html
    let messageTextBox = $('#message').val()

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox
    }, function(){
        messageTextBox.val('');
    })
});

const locationButton = $("#send-location");
locationButton.on('click',function () {
    //If browser doesnt support geolocation
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr("disabled",'disabled').text('Sending location...');

    //fetch location and emits to server if it works.
    navigator.geolocation.getCurrentPosition(function (position) {  
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
        });
    },function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location.');
    });
})