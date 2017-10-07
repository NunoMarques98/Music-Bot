const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

mongoose.connect('mongodb://Cinder:cinder@ds153413.mlab.com:53413/usersplaylist');

var sudaSchema = new mongoose.Schema({

    userID: Number,
    musics: [{
        plName: String,
        music: Array,
    }]

});

var Suda = mongoose.model('Suda', sudaSchema);

var sudaMusic = require('./augments/sudaMusic');
var sudaPlaylist = require('./augments/playlist');
var sudaMessage = require('./augments/sudaMessage');

client.on('ready', function(){
    
      let textChannel = client.channels.get('301448602092437505');
    
      channel = client.channels.find('name', 'Ordis');
      textChannel.send(":diamonds: What are you curious about? :diamonds:");
      
    })

client.on('message', function(message){
      
      sudaMusic.sudaMusic(message);
      sudaPlaylist.recog(message);
      sudaMessage.res(message);
  });

module.exports.Suda = Suda;


client.login('MzYwOTYzNDAwNzgxNzkxMjQz.DKdQtg.1uBNlipi6-B9l7GvI4nPVTYGf6M');