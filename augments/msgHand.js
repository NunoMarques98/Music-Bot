var SudaBasics = require('./sudaBasics.js');
var SudaTalk = require('./SudaTalk.js');

module.exports = class Message {

  constructor() {

    this.sudaKeywords = ["!suda", "!sudaHelp", "!wfce", "!wfcc"];
    this.playlistKeywords = [];
    this.sudaIntel = ["!sudaImp"];

  }

  sortMessage(message){

    let msg = message.content.split(" ");

    if(this.sudaKeywords.indexOf(msg[0]) != -1) {

      let keyWord = this.sudaKeywords.indexOf(msg[0]);

      let suda = new SudaBasics(message.member.voiceChannel, this.sudaKeywords[keyWord], message);

      delete suda.SudaBasics;

    }

    else if (this.playlistKeywords.indexOf(message.content) != -1) {

      let keyWord = this.playlistKeywords.indexOf(message.content);

    }

    else if (this.sudaIntel.indexOf(msg[0]) != -1) {

      let keyWord = this.sudaIntel.indexOf(msg[0]);

      let suda = new SudaTalk(message, this.sudaIntel[keyWord]);

      delete suda.SudaTalk;

    } else {

      let suda = new SudaTalk(message);

      delete suda.SudaTalk;

    }
  }
}
