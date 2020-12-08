'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('coordonate','{"latitude":48.78784141532905,"longitude":-3.231480160554523}')
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('msg', (msg) => {
    console.log('msg: ' + msg);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
