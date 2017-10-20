let existingConnect;
let channel;

module.exports ={

    res: function(message){

        switch (message.content) {
            case "!suda":

                channel = message.member.voiceChannel;
                sudaJoin(message);
                break;
            
            case "!sudaHelp":

                help(message);
                break;

            case "!wfce":

                checkCycle(message);
                break;

            default:
                break;
        }

    }

}

function sudaJoin(message){

    channel.join().then( function(connection){
 
        const dispatcher = connection.playFile('./assets/voice/CSgoodrank.ogx');
                
    }) 
}

function help(message){

    let help = '``` Here are my comands!\n Summon me into a voice chat:\n\n  !suda\n Songs:\n\n  !play SongURL, plays song\n  !playing, displays current song\n  !pause, pauses current song\n  !resume, unpauses current song\n  !skip, skip current song\n Playlisting:\n\n  !plRegister, gets you a spot on Suda database\n  !plAdd plname, creates a playlist with name plname\n  !plAddSong plname SongURL, adds a song to the playlis```'
                                                                                                                           

    message.member.send(help);

}

function checkCycle(message){

    let date = new Date();

    let quo = Math.floor((date.getHours()-1)/4);

    let time = (date.getHours()-1)*3600 + date.getMinutes()*60 + date.getSeconds();

    let timeRemaining = 14400*(quo + 1) - time;

    let hoursRemaining = Math.floor(timeRemaining/3600);

    let minutesRemaining = Math.floor((timeRemaining - hoursRemaining*3600)/60);

    let secondsRemaining = timeRemaining - hoursRemaining*3600 - minutesRemaining*60;

    if(quo % 2 == 0){

        message.reply(`It's :earth_africa: day cycle :sunny: Remaining ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`)

    } else {

        message.reply(`It's :earth_africa: night cycle :full_moon: Remaining ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`)

    }

}