import express from 'express';
import { Server, Socket } from "socket.io";
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors())
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket: any) => {

    socket.broadcast.emit('Hello');
    console.log("Connected...");

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });

    socket.on('chat message', (msg: String) => {
        io.emit('chat message', msg);
    });

    socket.on('foo', (msg: String) => {
        io.emit('foo', msg);
    })

})


server.listen(4000, () => {
    console.log("Server Started");
})