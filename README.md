# TP Réseaux et flux multimédia - Charles Picard - IMR3

## Arborescence :
* index.html : Page web qui permet au client d'interagir avec le serveur
* server.js : Serveur avec les websockets et la gestion du bot
* package.json : Description des packages et definition des dependances

## Page d'accès au TP

http://rfmwebsocket.herokuapp.com/

## Explication 

La partie client est décomposée en deux parties, une affichant la carte avec la position de Santa et l'estimation de la localisation de sa maison (différencié par une image de Santa). La seconde partie est un champ texte permettant d'interagir avec un bot conversationnel.

Les différents messages pouvant être envoyés sont : 
* **my name is ...**
* **call me ...**
* **i am ... years old**
* **i am a ...**
* **i ame from|live in ...**
* **my favorite ... is ...**
* **i a a single**
* **i have a girlfriend**
* **i have a boyfriend**
* **my girlfriend|boyfriend name is ...**
* **what is my name|who am i|do you know my name|do you know who i am**
* **how old am i|do you know how old i am|do you know my age**
* **what is my favorite ...**
* **who is my (boyfriend|girlfriend|spouse)**

Pour plus d'informations voir : https://github.com/aichaos/rivescript-js/blob/master/eg/brain/clients.rive














