var suda = require('../suda.js');
var ytdl = require('ytdl-core');

module.exports = {

    recog: function(message){

        var messageReceived = message.content.split(" ");

        switch(messageReceived[0]){

            case '!plRegister':

                createRegister(message.author.id, message);
                break;

            case '!plAdd':

                addPlaylist(message.author.id, messageReceived, message);
                break;

            case '!plAddSong':

                addSongToPl(message.author.id, messageReceived, message);
                break;

            case '!plPlay':

                play(message.author.id, messageReceived, message);
                break;

            case '!plSkip':

                skip();
                break;

            case '!plListSongs':

                displaySongs(message.author.id, messageReceived, message);
                break;

            case '!plRemove':

                removePlaylist(message.author.id, messageReceived, message);
                break;

            case '!plListPl':

                displayPl(message.author.id, message);
                break;

            case '!plRemoveSong':

                removeSong(message.author.id, messageReceived, message);
                break;
        }
    }

}

function createRegister(id, message){

    suda.Suda.find({userID: id}, function(err, data){

        if(data.length == 0){

            var user = new suda.Suda({userID: id, musics: []});

            user.save((err)=>{

                if(err) throw err;

                     message.reply(" you have been registered!");

                })

                }else{

                    message.reply(" you have already been registered!");
        }

    });

}

function addPlaylist(id, message, author){

    if(message.length === 2){

        suda.Suda.update({userID: id}, {$push : {musics: {plName: message[1], music: [] }}}, function(err){

            if(err) throw err;

        });

        author.reply(" your playlist has been created!");

    }else{

        author.reply(" you should include a name. For example !plAdd name");

    }
}

function play(id, messageReceived, message){

    suda.Suda.find({userID: id}, function (err, data) {

       let elementMusics = [];

       data[0].musics.forEach( function(element) {

            if(element.plName === messageReceived[1]){

                for(let i = 0; i < element.music.length; i++){

                    elementMusics.push(element.music[i].link);

                }

            };

       }, this)

       if(message.member != undefined && elementMusics != undefined){

            if(!message.member.voiceChannel) message.reply(" you must be in a voice channel!");

                playMusic(elementMusics, message);
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

function addSongToPl(id, message, author){

    if(message.length === 3){

        ytdl.getInfo(message[2], (err, info) =>{

            suda.Suda.update({'musics.plName': message[1]}, {'$push' : {'musics.$.music' : {link: message[2], title: info.title  } }},
            function(callback){

                })

        })

        author.reply(`your song  has been added to ${message[1]}!`);


        } else {

            author.reply(" you should include your playlist name and the url of the song to be added. For example ");

        }

}

function skip(){

    dispatcher.end();
}

function displaySongs(id, messageReceived, author){

    suda.Suda.findOne({userID: id, 'musics.plName': messageReceived[1]}, (err, data)=>{

        let plPos;

        for (var i = 0; i < data.musics.length; i++) {

            if(data.musics[i].plName === messageReceived[1]) plPos = i;

        }

        let songTitles = [];

        data.musics[plPos].music.forEach( (musicTitle) => {

            songTitles.push(musicTitle.title);

        })


        let songList = '```'

        for(let i = 0; i < songTitles.length; i++){

            songList += (i+1) + ' ' + songTitles[i] + '\n';

        }

        songList += '```';

        author.reply(songList);

    })
}

function displayPl(id, author){

    suda.Suda.find({userID: id}).then( (data) => {

        let plTitles = [];
        data[0].musics.forEach( (playlist) => {

            plTitles.push(playlist.plName);

        })

        let songList = '```'

        for(let i = 0; i < plTitles.length; i++){

            songList += (i+1) + ' ' + plTitles[i] + '\n';

        }

        songList += '```';

        author.reply(songList);

    })
}

function removePlaylist(id, messageReceived, author){

    suda.Suda.update({userID: id}, {"$pull": {"musics": {"plName": messageReceived[1]}}}, function(callback){


        })

    author.reply(`Your playlist ${messageReceived[1]} was successfully removed!`);

}

function removeSong(id, messageReceived, author){

    suda.Suda.findOne({userID: id, 'musics.plName': messageReceived[1]}, (err, data)=>{

        let plPos;

        for (var i = 0; i < data.musics.length; i++) {

            if(data.musics[i].plName === messageReceived[1]) plPos = i;

        }

        let songs = [];

        data.musics[plPos].music.forEach( (music) => {

            songs.push({link: music.link, title: music.title});

        })

        let songToRemove = songs[messageReceived[2]-1];

        suda.Suda.update({'musics.plName': messageReceived[1]},
            {'$pull' : {'musics.$.music' : {link: songToRemove.link, title: songToRemove.title}}}, (cb) =>{


                })

        author.reply(`Song ${songToRemove.title} was successfully removed from ${messageReceived[1]}!`);

    })


}
