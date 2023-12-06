let socket = io();


socket.on('connection', () => {
    console.log("A new user just connected")
});

socket.on('disconnect', () => {
    console.log("A new user just dis-connected");
});

socket.on('newMessage', function (message) {
    console.log(message)
});