require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('nickname', {});
});

app.get('/lls', (req, res) => {
    const nick = req.query.nickname;
    io.nickname = nick;

    res.render('index', {
        nickname: io.nickname,
    });

    io.on('connection', (socket) => {
        let total = io.engine.clientsCount;
        io.emit('connected', 'a user has connected');
        io.emit('userCount', total);

        socket.on('disconnect', () => {
            let total = io.engine.clientsCount;
            io.emit('disconnected', 'a user has disconnected');
            io.emit('userCount', total);
        });
    });
});

server.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
});
