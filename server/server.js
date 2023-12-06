const express = require('express')
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected")
    
    socket.on('createMessage', (message, callback) => {
        console.log(message)
    });

    socket.emit('newMessage',{
        from:"Admin",
        text:"Welcome to chat app",
        createdAt:new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text:"new User join",
        createdAt:new Date().getTime()
    })

    socket.on('disconnect', (socket) => {
        console.log("A new user just dis-connected");
    });
});


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
  })