var ytdl = require('ytdl-core');
var ytqueque = [];

var requester = [];

module.exports.sudaMusic = function(message){

if(message.content.toLowerCase() === '!playing'){

  return message.reply('Playing at Ordis Radio ' + ytqueque[0]);

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

  var video = message.content.split(" ");

  console.log(video);  

  if(video.length == 2 && ytqueque.length == 0 ){

    ytqueque.push(video[1].replace("'" , '"'));
    requester.push(message.member.id);

    play( ytqueque[0], message);
    //return message.reply("What will you listen?");
    

  }else if(video.length == 2 && ytqueque.length != 0){

    ytqueque.push(video[1].replace("'" , '"'));
    return message.reply("Added to queque!");

  }
  else{
    
    return message.reply("Please enter a link");
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
