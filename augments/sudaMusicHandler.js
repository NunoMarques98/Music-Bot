let suda = require('../suda.js');
let SudaPlay = require('./sudaPlay.js');
let SudaPlaylist = require('./sudaPlaylist.js');

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

        this.sudaPlaylist.register(message.member.id, message);

      break;

      case "!plAdd":

        let plName = message.content.split(" ");

        this.sudaPlaylist.createPl(message.member.id, plName[1], message);

      break;

      case "!plAddSong":

        let songInfo = message.content.split(" ");

        this.sudaPlaylist.addSongToPl(message.member.id, songInfo, message);

      break;

      case "!plPlay":

        let messageInfo = message.content.split(" ")[1];

        this.sudaPlaylist.getPlSongs(message.member.id, messageInfo, message).then( (links) =>{

          this.suda.enqueueFromPl(links);

          this.suda.selector(message.member.voiceChannel);
        });

      break;

      case "!plListSongs":

        let name = message.content.split(" ")[1];

        this.sudaPlaylist.listPlSongs(message.member.id, name, message);

      break;

      case "!plRemove":

        let plToRemove = message.content.split(" ")[1];

        this.sudaPlaylist.removePl(message.member.id, plToRemove, message);

      break;
      case "!plListPl":

        this.sudaPlaylist.listPl(message.member.id, message);

      break;
      case "!plRemoveSong":

        let songToRemove = message.content.split(" ");

        this.sudaPlaylist.removeSongFromPl(message.member.id, songToRemove[1], songToRemove[2], message);
        
      break;

    }
  }

}
