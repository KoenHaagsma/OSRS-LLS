require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { decode_base64 } = require('./utils/decode_base64');
const path = require('path');

const sockets = {};
let cost = 0;
let items = [];

// Not a clean fix for error in Heroku but it works
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'));
app.use(cors());

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('nickname', {});
});

app.get('/lls', (req, res) => {
    res.render('index');

    // Once is i think not a proper fix but it works for now
    io.once('connection', (socket) => {
        console.log('A user has just connected');

        sockets[socket.id] = req.query.nickname;
        socket.emit('name-generated', sockets[socket.id]);
        io.emit('update-peers', Object.values(sockets));

        let total = io.engine.clientsCount;
        io.emit('users', { total: total });

        if (items.length > 0) {
            io.emit('updateItems', items);
        }

        io.emit('priceChange', cost / io.engine.clientsCount);

        socket.on('addItem', (data) => {
            let isLinkedItemID = false;

            if (data.error) {
                return;
            }

            if (data.linked_id_item !== null && data.linked_id_item !== undefined && data.linked_id_item !== false)
                isLinkedItemID = true;

            // Decode base64 into .png
            decode_base64(data.icon, `${isLinkedItemID ? data.linked_id_item : data.id}`);

            fetch(
                `https://prices.runescape.wiki/api/v1/osrs/latest?id=${isLinkedItemID ? data.linked_id_item : data.id}`,
            )
                .then((res) => res.json())
                .then((price) => {
                    if (Object.keys(price.data).length === 0) {
                        socket.emit('error', { error: `Price data couldn't be retrieved` });
                        return;
                    }
                    let average =
                        (price.data[`${isLinkedItemID ? data.linked_id_item : data.id}`].low +
                            price.data[`${isLinkedItemID ? data.linked_id_item : data.id}`].high) /
                        2;
                    cost += average;

                    io.emit('priceChange', cost / io.engine.clientsCount);

                    let priceFormat;
                    // Under a Thousand
                    if (average <= 1000) {
                        priceFormat = `<p>${average}</p>`;
                    }
                    // Under a Million
                    else if (average <= 1000000) {
                        priceFormat = `<p>${(average / 1000).toFixed(2)}k</p>`;
                        // Above a Million
                    } else {
                        priceFormat = `<p class="million">${(average / 1000000).toFixed(2)}m</p>`;
                    }
                    let sendData = {
                        id: isLinkedItemID ? data.linked_id_item : data.id,
                        name: data.name,
                        url: data.wiki_url,
                        icon: path.join('images', `${isLinkedItemID ? data.linked_id_item : data.id}.png`),
                        price: priceFormat,
                        realPrice: average,
                    };

                    items.push(sendData);
                    io.emit('updateItems', items);
                })
                .catch((err) => {
                    socket.emit('error', { error: `Price data couldn't be retrieved` });
                    return;
                });
        });

        socket.on('deleteItem', (data) => {
            console.log(items[data]);
            cost -= items[data].realPrice;
            items.splice(data, 1);
            io.emit('priceChange', cost / io.engine.clientsCount);
            io.emit('updateItems', items);
        });

        // On disconnect delete socket and update all users + user count
        socket.on('disconnect', () => {
            delete sockets[socket.id];
            io.emit('update-peers', Object.values(sockets));

            console.log('disconnected');

            let total = io.engine.clientsCount;
            io.emit('users', { total: total });
        });
    });
});

http.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
});
