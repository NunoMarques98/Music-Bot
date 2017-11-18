module.exports = class SudaBasics {

  constructor(channel, command, message) {

    this.channel = channel;
    this.message = message;

    switch (command) {
      case "!suda":

          this.joinChannel();
          break;

      case "!sudaHelp":

          this.help();
          break;

      case "!wfcc":

          this.wfcc();
          break;

      case "!wfce":

          this.wfce();
          break;

    }
  }

  joinChannel(){

    this.channel.join().then( function(connection){

        const dispatcher = connection.playFile('./assets/voice/CSgoodrank.ogx');

    })
  }

  help(){

    let help3 = "```py\n#Playlist Commands:\n  '!plRegister', gets you a spot on Suda database\n  '!plAdd plname', creates a playlist with name plname\n  '!plAddSong plname SongURL', adds a song to the playlist\nPage 3 ```"
    let help2 = "```py\n#Music Commands:\n  '!play SongURL', Plays song\n  '!playing', Displays current song\n  '!pause', Pauses current song\n  '!resume', Unpauses current song\n  '!skip', Skips current song\nPage 2```"
    let help1 = "```py\n#Basic Commands\n '!suda', Summons me to a voice chat\nPage 1```"
    let help = "```py\n#Look at my help pages:\n    Type 1 for basic commands\n    Type 2 for music help\n    Type 3 for playlist help\n    Type stop to exit```"

    this.message.member.createDM().then((channel) =>{

        channel.send(help);

        const collector =  channel.createMessageCollector(m => m.content != undefined );

        collector.on('collect', (m)=>{

            switch (m.content) {

                case '1':

                    channel.send(help1);
                    break;

                case '2':

                    channel.send(help2);
                    break;

                case '3':

                    channel.send(help3);
                    break;

                case 'stop':

                    channel.send("I bid you farewell!")
                    collector.stop();
                    break;
            }
        })
    })

  }

  wfcc(){

    let quo = Math.floor((new Date()).getTime() / 1000 + 780) % 9000

     if(quo < 3000) {

         this.message.reply(`It's Cetus night cycle :full_moon:`);

     } else{

         this.message.reply(`It's Cetus day cycle :sunny:`);
     }
  }

  wfce(){

    let date = new Date();

    let quo = Math.floor((date.getHours()-1)/4);

    let time = (date.getHours()-1)*3600 + date.getMinutes()*60 + date.getSeconds();

    let timeRemaining = 14400*(quo + 1) - time;

    let hoursRemaining = Math.floor(timeRemaining/3600);

    let minutesRemaining = Math.floor((timeRemaining - hoursRemaining*3600)/60);

    let secondsRemaining = timeRemaining - hoursRemaining*3600 - minutesRemaining*60;

    if(quo % 2 == 0){

        this.message.reply(`It's :earth_africa: day cycle :sunny: Remaining ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`)

    } else {

        this.message.reply(`It's :earth_africa: night cycle :full_moon: Remaining ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`)

    }

  }
}
