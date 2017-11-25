let ytdl = require('ytdl-core');

module.exports = class SudaPlay {

  constructor() {

    this.dispatcher;
    this.queue = [];
    this.voiceChannel;

  }

  enqueue(message){

    if(true){

      let message_parts = message.content.split(" ");

      let music = message_parts[1].replace("'", '"');

      this.queue.push(music);

    }

  };

  selector(voiceChannel){

    voiceChannel.join().then( (connection) => {

        this.play(connection);

        this.dispatcher.on('end', () =>{

            this.next();

        })

      })

  };

  play(connection){

    let musicToPlay = ytdl( this.queue[0], { filter: 'audioonly'});

    this.dispatcher = connection.playStream(musicToPlay);

  };

  playing(){

    return this.queue[0];
  }

  handler(message){

    this.voiceChannel = message.member.voiceChannel;

    if(this.queue.length == 0){

      this.enqueue(message);
      this.selector(this.voiceChannel);

    } else if (this.queue.length != 0) {

      this.enqueue(message);

    }
  }

  skip(){

    this.dispatcher.end();

  }

  next(){

    this.queue.shift();

    if(this.queue.length == 0){

      this.voiceChannel.leave();
    }

    else {

      this.selector(this.voiceChannel);

    }
  }
}
