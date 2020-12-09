'use strict';

let Santa = require('./santa_class.js');

let sweden = {	
		latitude:67.498454,
		longitude:21.040181
	};

let mySanta = new Santa(sweden);

const express = require('express');
const socketIO = require('socket.io');
const reviscript = require('rivescript');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var bot = new reviscript();

bot.loadDirectory("rive").then(loading_done).catch(loading_error);
 
bot.loadFile("rive/client.rive").then(loading_done).catch(loading_error);
 
function loading_done() {
  console.log("Bot has finished loading!");
 
  bot.sortReplies();
}
 
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('msg', (msg) => {
    console.log('msg: ' + msg);
    bot.reply("client", msg).then(function(reply) {
      console.log("The bot says: " + reply);
    });
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
setInterval( () => io.emit('santa', JSON.stringify(mySanta.getPosition())), 5000);
