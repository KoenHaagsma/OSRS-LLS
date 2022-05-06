require('dotenv').config();
const uniqueID = require('./utils/randomID.js');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const sockets = {};

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('nickname', {});
});

app.get('/lls', (req, res) => {
    res.render('index');

    io.on('connect', (socket) => {
        console.log('A user has just connected');

        sockets[socket.id] = req.query.nickname;
        socket.emit('name-generated', sockets[socket.id]);
        io.emit('update-peers', Object.values(sockets));

        let total = io.engine.clientsCount;
        io.emit('users', { total: total });

        socket.on('disconnect', () => {
            delete sockets[socket.id];
            io.emit('update-peers', Object.values(sockets));

            let total = io.engine.clientsCount;
            io.emit('users', { total: total });
        });
    });
});

server.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
});
