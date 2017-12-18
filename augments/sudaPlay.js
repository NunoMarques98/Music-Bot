const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCy3zVz5ifeL--w7hycaOESA5vUtqD7vVA');

const Queue = require('../dataStructures/queue');

module.exports = class SudaPlay {

  constructor() {

    this.dispatcher;
    this.queue = new Queue();
    this.voiceChannel;

  }

  enqueue(message){

    let url = message.content.slice(6);

    let music = url.replace("'", '"');

    if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)/)){

      this.queue.enqueue(music);

    } else {

      youtube.searchVideos(music, 1).then( (results) =>{

        this.queue.enqueue(`https://www.youtube.com/watch?v=${results[0].id}`);

      })
    }
  };

  enqueueFromPl(musicLinks){

    musicLinks.forEach( (link) =>{

      let linkQ = link.replace("'", '"');

      this.queue.enqueue(linkQ);
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

    let musicToPlay = ytdl( this.queue.front(), { filter: 'audioonly'});

    this.dispatcher = connection.playStream(musicToPlay);

  };

  playing(){

    return this.queue.front();
  }

  handler(message){

    this.voiceChannel = message.member.voiceChannel;

    if(this.queue.isEmpty()){

      this.enqueue(message);
      this.selector(this.voiceChannel);

    } else {

      this.enqueue(message);

    }
  }

  skip(){

    this.dispatcher.end();

  }

  next(){

    this.queue.dequeue();

    if(this.queue.isEmpty()){

      this.voiceChannel.leave();
    }

    else {

      this.selector(this.voiceChannel);

    }
  }
}
