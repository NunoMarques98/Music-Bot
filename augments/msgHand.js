let SudaBasics = require('./sudaBasics.js');
let SudaTalk = require('./sudaTalk.js');
let SudaPlaylist = require('./sudaPlaylist.js');
let SudaMusicHandler = require('./sudaMusicHandler.js');
let SudaSecurity = require('../security/msgSecurity');

module.exports = class Message {

  constructor() {

    this.sudaKeywords = ["!suda", "!sudaHelp", "!wfce", "!wfcc"];
    this.playlistKeywords = ["!play", "!playing", "!pause", "!resume",
                             "!skip", "!plRegister", "!plAdd", "!plAddSong", "!plPlay", "!plSkip",
                             "!plListSongs", "!plRemove", "!plListPl", "!plRemoveSong"];
    this.sudaIntel = ["!sudaImp"];

    this.sudaPlaylist = new SudaMusicHandler();
    this.sudaBasics = new SudaBasics();
    this.sudaTalk = new SudaTalk();
    this.security = new SudaSecurity();

  }

  sortMessage(message){

    let msg = message.content.split(" ");

    if(this.sudaKeywords.indexOf(msg[0]) != -1) {

      if(!this.security.checkVoiceChannel(message).pass){

        message.reply(msg);

        return
      }

      let keyWord = this.sudaKeywords.indexOf(msg[0]);

      this.sudaBasics.handler(this.sudaKeywords[keyWord], message, message.member.voiceChannel);

    }

    else if (this.playlistKeywords.indexOf(msg[0]) != -1) {

      if(!this.security.checkVoiceChannel(message).pass){

        message.reply(msg);

        return
      }

      let keyWord = this.playlistKeywords.indexOf(msg[0]);

      this.sudaPlaylist.handler(this.playlistKeywords[keyWord], message);

    }

    else if (this.sudaIntel.indexOf(msg[0]) != -1) {

      let keyWord = this.sudaIntel.indexOf(msg[0]);

      this.sudaTalk.handler(this.sudaIntel[keyWord], message)


    } else {

      this.sudaTalk.handler(null, message)

    }
  }
}
