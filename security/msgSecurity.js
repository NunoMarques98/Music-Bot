let User = require('../models/playlistSchema');

module.exports = class SudaSecurity {

  constructor() {

  }

  checkVoiceChannel(message){

    if(message.member.voiceChannel !== undefined){

      return { pass: true, msg: null};

    } else {

      return { pass: false, msg: ' you should be in a voice channel first!!'}
    }

  }
}
