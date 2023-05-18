"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io"); //🦋p
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on('connection', (socket) => {
    socket.broadcast.emit('Hello');
    console.log("Connected...");
    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('foo', (msg) => {
        io.emit('foo', msg);
    });
    socket.on('Notifications', () => {
        socket.to("jane").emit("hello jane");
    });
});
server.listen(4000, () => {
    console.log("Server Started");
});
