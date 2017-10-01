const Discord = require('discord.js');
const client = new Discord.Client();

var sudaMusic = require('./augments/sudaMusic');

client.on('ready', function(){
    
      //let channel = client.channels.get('81385020756865024');
      let textChannel = client.channels.get('301448602092437505');
    
     
      channel = client.channels.find('name', 'Ordis');
      textChannel.sendMessage(":diamonds: What are you curious about? :diamonds:");
      /*channel.join()
      .then(connection =>{
    
         console.log('Connected');
         textChannel.sendMessage(":diamond_shape_with_a_dot_inside: I'm ready for Rock and Ro... I mean help you!! :ballot_box_with_check: ")   
    
         }).catch(console.error);*/
      
    })

client.on('message', function(message){
    
      
      sudaMusic.sudaMusic(message);
      
  
  });


client.login('MzYwOTYzNDAwNzgxNzkxMjQz.DKdQtg.1uBNlipi6-B9l7GvI4nPVTYGf6M');