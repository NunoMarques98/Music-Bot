let SudaDB = require('../suda.js');

module.exports = class SudaPlaylist {

  constructor(sudaPlay) {

    this.suda = sudaPlay;

  }

  register(id) {

    SudaDB.Suda.find({userID: id}, function(err, data){

        if(data.length == 0){

          this.createUser(id);

          message.reply(" you have been registered!");

        } else {

          message.reply(" you have already been registered!");

        }

    });
  }

  createUser(id) {

    let user = new SudaDB.Suda({userID: id, musics: []});

    user.save( (err) => {

        if(err) throw err;

    });
  }

  createPl(id, plName, member) {

    if(message.length === 2){

        suda.Suda.update({userID: id}, {$push : {musics: {plName: message[1], music: [] }}}, function(err){

            if(err) throw err;

        });

        member.reply(" your playlist has been created!");

    } else {

        member.reply(" you should include a name. For example !plAdd name");

    }
  }

  addSongToPl(id, songInfo, member) {

    let plName = songInfo[1];
    let songLink = songInfo[2];

    if ( songInfo.length === 3 ) {

      ytdl.getInfo( songLink, (err, info) =>{

        SudaBD.Suda.update( {'musics.plName': plName}, {'$push' : {'musics.$.music' : {link: songLink, title: info.title } }},

          (callback) => {

          });

      });

      member.reply(`your song  has been added to ${songInfo[1]}!`);

    } else {

      member.reply(" you should include your playlist name and the url of the song to be added. For example ");

    }
  }

  getPlSongs(id, plInfo, member){

    /*let plName = plInfo[1];

    SudaBD.Suda.find( {userID: id}, (err, data) => {

       let elementMusics = [];

       data[0].musics.

       data[0].musics.forEach( (element) => {

          if(element.plName === plName){

            for(let i = 0; i < element.music.length; i++){

              elementMusics.push(element.music[i].link);

            }

            return elementMusics

          };

    }, this)
  }*/
  }
}
