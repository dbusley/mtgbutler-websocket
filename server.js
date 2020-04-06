const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const {get} = require('./client.js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server: server, path: '/websocket'});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        ws.send(message);
    });
});

const interval = setInterval(async () => {
    if (wss.clients.size > 0) {
        const card = await get('cards/search/random');
        wss.clients.forEach((ws) => {
            if (card) {
                ws.send(JSON.stringify({
                    name: card.name,
                    latestPrice: card.latestPrice,
                }));
            }
        });
    }
}, 5000);

wss.on('close', function close() {
    clearInterval(interval);
});

app.get("/", (req, res) => {
   res.send("healthy");
});

server.listen(3001);
