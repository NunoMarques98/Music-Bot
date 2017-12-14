const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCy3zVz5ifeL--w7hycaOESA5vUtqD7vVA');
const SudaSecurity = require('../security/plSecurity');

let User = require('../models/playlistSchema');

module.exports = class SudaPlaylist {

  constructor(sudaPlay) {

    this.suda = sudaPlay;
    this.security = new SudaSecurity();

  }

  register(id, message){

    this.security.checkExistance(id).then( (exist) => {

      if(exist){

        User.createUser(id);

        message.reply(" you have been registered!");

      } else {

        message.reply(" you have already been registered!");

      }
   })
  }

  createPl(id, plName, member) {

    this.security.checkExistanceAndName(id, plName).then( (data) => {

      if(data.toAdd){

        User.getUserById(id).then( (data) => {

              data.playlists.push({plName: plName, musics: []})

              data.save().then( () => {

                member.reply(" your playlist has been created!");
          })
        })

      } else {

        member.reply(data.msg);

      }
   })
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

    let songData = { plName: songInfo[1], link: songInfo[2] };

    ytdl.getInfo( songData.link, (err, info) => {

      User.getUserById(id, (err, data) => {

        let index = this.getIndex(data, songData.plName);

        data.playlists[index].musics.push({musicTitle: info.title, musicLink: songData.link});

        data.save().then( () => {

            member.reply(`your song  has been added to ${plName}!`);

        })
      })
    })
  }

  removeSongFromPl(id, plName, songID, member){

    User.getUserById(id, (err, data) => {

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

    User.getUserById(id, (err, data) =>{

      if (err) throw err;

      let index = this.getIndex(data, plName);

      this.getPropertyName(data.playlists[index].musics).then( (names) =>{

        let res = this.toMarkdown(names);

        member.reply(res);

      })
    })
  }

  listPl(id, member){

    User.getUserById(id, (err, data) =>{

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
