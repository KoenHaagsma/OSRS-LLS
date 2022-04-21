require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { create_json } = require('./src/utils/create_json.js');
const itemsSummary = require('./public/items-summary.json');
const iconsItems = require('./public/icons-items-complete.json');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    create_json(itemsSummary, iconsItems);
});

io.on('connection', (socket) => {
    io.emit('connected', 'a user has connected');

    socket.on('disconnect', () => {
        io.emit('disconnected', 'a user has disconnected');
    });

    socket.on('send-nickname', (nickname) => {
        socket.nickname = nickname;
    });

    socket.on('chat-message', (msg) => {
        io.emit('chat-message', { msg, nickname: socket.nickname });
    });
});

server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(`Application started on port: http://localhost:${process.env.PORT}`);
// });