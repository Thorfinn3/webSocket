'use strict';

//Initialisation et import des variables
let Santa = require('./santa_class.js');

let sweden = {	
		latitude:67.498454,
		longitude:21.040181
	};

let mySanta = new Santa(sweden);

const express = require('express');
const socketIO = require('socket.io');
var rivescript = require('rivescript');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//Creation du socket 
const io = socketIO(server);

//Initialisation du bot
var bot = new rivescript();

//Chargement du fichier de bot
bot.loadDirectory("rive").then(loading_done).catch(loading_error); 
bot.loadFile("rive/client.rive").then(loading_done).catch(loading_error);
 
//Fonction de verification que le chargement du bot est bon
function loading_done() {
  console.log("Bot has finished loading!");
  bot.sortReplies();
}
 
//Fonction d'affichage d'un message d'erreur lorsque le bot est mal chargé
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

//Ecoute des connections des clients sur le socket
io.on('connection', (socket) => {
  console.log('Client connected');

  //Ecoute des messages reçus par le client
  socket.on('msg', (msg) => {
    console.log('msg: ' + msg);

    //Reccuperation de la reponse du bot rivescript
    bot.reply("client", msg).then(function(reply) {
      console.log("The bot says: " + reply);

      //Envoi de la reponse du bot au client
      io.emit('river', "The bot says: " + reply);
    });
  });

  //Gestion de la deconnection du client
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//Envoi regulie de la position du Santa toute les 5 secondes
setInterval( () => io.emit('santa', JSON.stringify(mySanta.getPosition())), 5000);
