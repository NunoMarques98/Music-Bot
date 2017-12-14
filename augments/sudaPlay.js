const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCy3zVz5ifeL--w7hycaOESA5vUtqD7vVA');

module.exports = class SudaPlay {

  constructor() {

    this.dispatcher;
    this.queue = [];
    this.voiceChannel;

  }

  enqueue(message){

    let url = message.content.slice(6);

    let music = url.replace("'", '"');

    console.log(music);

    if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)/)){

      this.queue.push(music);

    } else {

      youtube.searchVideos(music, 1).then( (results) =>{

        this.queue.push(`https://www.youtube.com/watch?v=${results[0].id}`);

      })
    }
  };

  enqueueFromPl(musicLinks){

    musicLinks.forEach( (link) =>{

      let linkQ = link.replace("'", '"');

      this.queue.push(linkQ);
    })
  }

  selector(voiceChannel){

    this.voiceChannel = voiceChannel;

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
