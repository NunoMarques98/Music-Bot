let ytdl = require('ytdl-core');

let ytqueque = [];

let requester = [];

module.exports.sudaMusic = function(message){

if(message.content.toLowerCase() === '!playing'){

  return message.reply('Playing at Suda Radio ' + ytqueque[0]);

}

if(message.content.toLowerCase() === '!pause'){

  dispatcher.pause();

}

if(message.content.toLowerCase() === '!resume'){

  if(dispatcher.pause){

    dispatcher.resume();

  }else{

    message.reply("Video is not paused");
  }


}

if(message.content.toLowerCase() === '!skip' && message.member.id === requester[0]){
  
  dispatcher.end();
}


  if (message.content.toLowerCase().startsWith('!play')){

  if(message.member.voiceChannel){

    var video = message.content.split(" ");
    
      if(video.length == 2 && ytqueque.length == 0 ){
    
        ytqueque.push(video[1].replace("'" , '"'));
        requester.push(message.member.id);
    
        play( ytqueque[0], message);
    
      }else if(video.length == 2 && ytqueque.length != 0){
    
        ytqueque.push(video[1].replace("'" , '"'));
        return message.reply("Added to queque!");
    
      }
      else{
        
        return message.reply("Please enter a link");
    }
  }
  else {

    message.reply("Please be in a voice channel!");

  }
}

};  

function play(audio, message){


    if(message.member != undefined && audio != undefined){

      const voiceChannel = message.member.voiceChannel;
      audio.replace("'" , '"' );


    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
       

      voiceChannel.join().then(connnection => {

        const stream = ytdl(audio, { filter: 'audioonly' });

        dispatcher = connnection.playStream(stream);

        dispatcher.on('end', () => {
  
          ytqueque.shift();
          requester.shift();

          if(ytqueque.length == 0){

            voiceChannel.leave()

          }else{

            play(ytqueque[0], message);

          }
         
        });
      });
    }
  } 

