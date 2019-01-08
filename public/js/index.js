const socket = io(); //initialize the request and keep the connection opened

socket.on('connect',function () {
    console.log("Connected to server");

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    const template = $('#message-template').html();
    const html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: message.createdAt
    });

    $('#messages').append(html);
   
});


socket.on('newLocationMessage',function(message){
    const template = $('#location-message-template').html();
    const html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: message.createdAt
    });
    $('#link').attr("href",message.url);

    $('#messages').append(html);


});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    //select input from index.html
    let messageTextBox = jQuery('input[name=message]').eq(0);

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
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