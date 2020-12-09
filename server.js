'use strict';

let Santa = require('./santa_class.js');

let sweden = {	
		latitude:67.498454,
		longitude:21.040181
	};

let mySanta = new Santa(sweden);

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

  socket.on('msg', (msg) => {
    console.log('msg: ' + msg);
    if(msg)
    socket.emit('coordonate',msg)
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
setInterval( () => io.emit('santa', JSON.stringify(mySanta.getPosition())), 2000);
