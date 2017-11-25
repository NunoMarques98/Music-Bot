let Message = require('./augments/msgHand');

const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

const RiveScript = require('rivescript');
const bot = new RiveScript();

mongoose.connect('mongodb://localhost/playlist');

let sudaSchema = new mongoose.Schema({

    userID: Number,
    musics: [{
        plName: String,
        music: [{link: String, title: String}],
    }]

});

let Suda = mongoose.model('Suda', sudaSchema);

let msg = new Message();

let sudaMusic = require('./augments/sudaMusic');
let sudaPlaylist = require('./augments/playlist');

client.on('ready', function(){

      let textChannel = client.channels.get('301448602092437505');

     /* channel = client.channels.find('name', 'Ordis');
      textChannel.send(":diamonds: What are you curious about? :diamonds:");*/

      bot.loadFile('./sudaIntel.rive', fileRead, fileError );

      for(let i = 0; i< 111; i++){

        let quo = Math.floor(i%10);

        let progress = [":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:",":heavy_minus_sign:"];

        progress[quo] = ":red_circle:";

        let str = progress.join('');

        textChannel.setTopic(str);

    }

})


client.on('message', function(message){


      /*sudaMusic.sudaMusic(message);
      sudaPlaylist.recog(message);
      */
      msg.sortMessage(message);
  });

function fileRead(){

    console.log("Read successful");
    bot.sortReplies();

    }

function fileError(error){

    console.log(error)

    }


module.exports.Suda = Suda;
module.exports.bot = bot;


client.login('Your bot token');
