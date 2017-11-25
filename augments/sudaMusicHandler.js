let suda = require('../suda.js');
let SudaPlay = require('./sudaPlay.js');
let SudaPlaylist = require('./sudaPlaylist.js');

let ytdl = require('ytdl-core');

module.exports = class SudaMusicHandler {

  constructor() {

    this.suda = new SudaPlay();
    this.sudaPlaylist = new SudaPlaylist(this.suda);

    }

  handler(command, message){

    switch (command) {

      case "!play":

        this.suda.handler(message);

      break;

      case "!playing":

        message.reply(this.suda.playing());

      break;

      case "!pause":

        this.suda.pause();

      break;

      case "!resume":

        this.suda.dispatcher.resume();

      break;

      case "!skip":

        this.suda.skip();

      break;

      case "!plRegister":

        this.sudaPlaylist.register(message.member.id);

      break;

      case "!plAdd":

        let plName = message.content.split(" ");

        this.sudaPlaylist.createPl( message.member.id, plName[1], message);

      break;

      case "!plAddSong":

        let songInfo = message.content.split(" ");

        this.sudaPlaylist.addSongToPl( message.member.id, songInfo, message);

      break;

      case "!plPlay":

        let songInfo = message.content.split(" ");

        let songList = this.sudaPlaylist.getPlSongs(message.member.id, songInfo, message);


      break;
      case "!plSkip":
      break;
      case "!plListSongs":
      break;
      case "!plRemove":
      break;
      case "!plListPl":
      break;
      case "!plRemoveSong":

      break;

    }
  }

}
