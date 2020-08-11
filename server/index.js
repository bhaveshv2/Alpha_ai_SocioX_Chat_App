const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./routes/index');
const userController = require('./controllers/usercontroller');

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection',(socket)=>{
    console.log(' New Connection! ');

    socket.on('join', ({username,chatroom},cb)=>{
        const {user,err} = userController.addUser({id:socket.id,username,chatroom});
        // console.log(user.username);
        if(err){
            return cb(err);
        }

        socket.join(user.chatroom);

        socket.emit('message',{
            user:'admin',
            text:`${user.username}, Welcome to the ${user.chatroom}`
        });

        socket.broadcast.to(user.chatroom).emit('message',{
            user:'admin',
            text:`${user.username} had joined the chatroom!`
        });
        
        // cb();
    });

    socket.on('sendMessage', (message,cb)=>{
        const user = userController.getUser(socket.id);

        io.to(user.chatroom).emit('message',{
            user:user.username,
            text:message,
        });
        
        cb();
    });

    socket.on('disconnect',()=>{
        console.log(' Connection has lost! ');
        const user = userController.removeUser(socket.id);

        if(user){
            io.to(user.chatroom).emit('message',{user:'admin', text:`${user.username} has left the room`});
        }
    });
})

server.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`)
});
