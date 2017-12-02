let User = require('../models/playlistSchema');
let ytdl = require('ytdl-core');

module.exports = class SudaPlaylist {

  constructor(sudaPlay) {

    this.suda = sudaPlay;

  }

  register(id, message){

    this.checkExistance(id, (result) => {

        if(result){

          this.createUser(id);

          message.reply(" you have been registered!");

        } else {

          message.reply(" you have already been registered!");
      }
    })
  }

  createUser(id){

    let user = new User({

      userID: id,
      bans: 0,
      playlists: []

    });

    user.save( (err) => {

        if(err) throw err;

    });
  }

  checkExistance(id, callback){

    User.findOne({userID: id}).then( (data) =>{

      callback(data === null);

    })
  }

  createPl(id, plName, member) {

    this.checkExistance(id, (result) =>{

      if(!result){

        User.findOne({userID: id}).then( (data) => {

              data.playlists.push({plName: plName, musics: []})

              data.save().then( () => {

                member.reply(" your playlist has been created!");
          })
        })

      } else {

        member.reply(" you should register first!");
      }
    })
      //member.reply(" you should include a name. For example !plAdd name");
  }

  removePl(id, plName, member){

    User.findOne({userID: id}).then( (data) => {

          let index = this.getIndex(data, plName);

          data.playlists.splice(index, 1);

          data.save().then( () => {

            member.reply(" your playlist has been removed!");
      })
    })
  }

  addSongToPl(id, songInfo, member) {

    let plName = songInfo[1];
    let songLink = songInfo[2];

    ytdl.getInfo( songLink, (err, info) => {

      User.findOne({userID: id}).then( (data) => {

        let index = this.getIndex(data, plName);

        data.playlists[index].musics.push({musicTitle: info.title, musicLink: songLink});

        data.save().then( () => {

            member.reply(`your song  has been added to ${plName}!`);

        })
      })
    })
      //member.reply(" you should include your playlist name and the url of the song to be added. For example ");
  }

  removeSongFromPl(id, plName, songID, member){

    User.findOne({userID: id}).then( (data) => {

      let index = this.getIndex(data, plName);

      data.playlists[index].musics.splice(songID - 1, 1);

      data.save().then( () => {

          member.reply(`your song  has been removed from ${plName}!`);

      })
    })
  }

  getIndex(data, plName){

    return( data.playlists.findIndex( (playlist) =>{

        return playlist.plName === plName;

    })
  )}

  getPlSongs(id, plName){

    return new Promise( (resolve, reject) =>{

      User.findOne({userID: id}).then( (data) =>{

        let index = this.getIndex(data, plName);

        let res = this.getLinks(data.playlists[index].musics);

        resolve(res);

      })
    })
  }

  listPlSongs(id, plName, member){

    User.findOne({userID: id}).then( (data) =>{

      let index = this.getIndex(data, plName);

      this.getPropertyName(data.playlists[index].musics).then( (names) =>{

        let res = this.toMarkdown(names);

        member.reply(res);

      })
    })
  }

  listPl(id, member){

    User.findOne({userID: id}).then( (data) =>{

        this.getPropertyName(data.playlists).then( (names) =>{

            let res = this.toMarkdown(names);

            member.reply(res);
        })
    })
  }

  getLinks(musics){

    let res = [];

    musics.forEach( (music) =>{

      res.push(music.musicLink);
    })

    return res;
  }

  getPropertyName(object){

    return new Promise( (resolve, reject) =>{

      let names = [];

      object.forEach( (list) =>{

        list.plName !== undefined ? names.push(list.plName) : names.push(list.musicTitle);

      });

      resolve(names);

    })
  }

  toMarkdown(names){

    let res = "```py\n";

    for (let i = 0; i < names.length; i++){

      res += `[${i + 1}] ${names[i]}\n`;
    }

    res += "```";

    return res;

  }
}
