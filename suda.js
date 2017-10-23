const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

const RiveScript = require('rivescript');
const bot = new RiveScript();

mongoose.connect('your mongo db link');

let sudaSchema = new mongoose.Schema({

    userID: Number,
    musics: [{
        plName: String,
        music: [{link: String, title: String}],
    }]

});

let Suda = mongoose.model('Suda', sudaSchema);

let sudaMusic = require('./augments/sudaMusic');
let sudaPlaylist = require('./augments/playlist');
let sudaMessage = require('./augments/sudaMessage');
let sudaIntel = require('./augments/sudaIntel');

client.on('ready', function(){
    
      let textChannel = client.channels.get('301448602092437505');
    
      channel = client.channels.find('name', 'Ordis');
      textChannel.send(":diamonds: What are you curious about? :diamonds:");

      bot.loadFile('./sudaIntel.rive', fileRead, fileError );
      
})


client.on('message', function(message){
      
      sudaMusic.sudaMusic(message);
      sudaPlaylist.recog(message);
      sudaMessage.res(message);
      sudaIntel.response(message);
      sudaIntel.addIntel(message);

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


client.login('yout bot token');