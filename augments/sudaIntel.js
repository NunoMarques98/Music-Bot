let Bot = require('../suda.js');

module.exports = {

    response: function(message){

        if(message.content.toLowerCase().includes("suda")){

            if(message.content !== ":diamonds: What are you curious about? :diamonds:" && !message.author.bot && 
            
                    !message.content.startsWith("!") ){
                
                let reply = Bot.bot.reply("local_user", message);
                
                if(reply === "ERR: No Reply Matched"){
                
                    message.reply("Sorry, I'm not programmed to answer that yet");
                    
                }else {
                
                     message.reply(reply);
                
                }
    
            }
        }
    }
}
       