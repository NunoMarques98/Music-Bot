const Message = require('./augments/msgHand');

const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const RiveScript = require('rivescript');
const bot = new RiveScript();

mongoose.connect('mongodb://localhost/playlist');

mongoose.connection.once('open', () => {

  console.log("Connection established!");

}).on('error', (err) => {

  console.log(err);

});

let msg = new Message();

client.on('ready', function(){

      /*let textChannel = client.channels.get('301448602092437505');

      channel = client.channels.find('name', 'Ordis');
      textChannel.send(":diamonds: What are you curious about? :diamonds:");*/

      bot.loadFile('./sudaIntel.rive', fileRead, fileError );

      /*for(let i = 0; i< 111; i++){

        let quo = Math.floor(i%10);

        let progress = [":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:"];

        progress[quo] = ":red_circle:";

        let str = progress.join('');

        textChannel.setTopic(str);

    }*/

})


client.on('message', function(message){

      msg.sortMessage(message);

  });

function fileRead(){

    console.log("Read successful");
    bot.sortReplies();

    }

function fileError(error){

    console.log(error)

    }

module.exports.bot = bot;


client.login('MzYwOTYzNDAwNzgxNzkxMjQz.DKdQtg.1uBNlipi6-B9l7GvI4nPVTYGf6M');
