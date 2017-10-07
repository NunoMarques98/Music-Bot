
var existingConnect;
var channel;

module.exports ={

    res: function(message){

        switch (message.content) {
            case "!suda":

                channel = message.member.voiceChannel;
                sudaJoin(message);
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