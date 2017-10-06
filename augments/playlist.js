var suda = require('../suda.js');
var ytdl = require('ytdl-core');

module.exports = {

    recog: function(message){

        var messageReceived = message.content.split(" ");

        switch(messageReceived[0]){

            case '!plCreate':

                createPlaylist(message.author.id, message);
                break;
            
            case '!plAddSong':

                addSong(message.author.id, messageReceived, message);
                break;

            case '!plPlay':

                play(message.author.id, message);
                break;

            case '!plSkip':
                skip();
                break;

        }
    }

}

function createPlaylist(id, message){

    suda.Suda.find({userID: id}, function(err, data){
        
        if(data.length == 0){    
            
            var user = new suda.Suda({userID: id, musics: []});
               
            user.save((err)=>{
            
                if(err) throw err;
            
                     message.reply(" your playlist has been created");
            
                })
                
                }else{
            
                    message.reply(" you have already a playlist!");
        }
        
    });

}

function addSong(id, song, author){

    if(song.length === 2){

        suda.Suda.update({userID: id}, {$push : {musics: song[1]}}, function(err){

            if(err) throw err;
        
        });

        author.reply(" your song has been added to the playlist!");

    }else{

        author.reply(" you should include a link. For example !plAddSong SongURL");

    }
}

function play(id, message){

    suda.Suda.find({userID: id}, function (err, data) {

       var musics = data[0].musics;

       if(message.member != undefined && musics != undefined){

            if(!message.member.voiceChannel) message.reply(" you must be in a voice channel!");

                playMusic(musics, message);
       }
    
    }
  );
}

function playMusic(audio, message){
        
    const voiceChannel = message.member.voiceChannel;
       
    voiceChannel.join().then(connnection => {
        
        const stream = ytdl(audio[0], { filter: 'audioonly' });

        dispatcher = connnection.playStream(stream);
            
        dispatcher.on('end', () => {
          
            audio.shift();
        
            if(audio.length == 0){
        
                voiceChannel.leave()
        
            }else{
        
                playMusic(audio, message);
            }
                  
        });
    });
}

function skip(){

    dispatcher.end();
}








