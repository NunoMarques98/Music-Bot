let fs = require('fs');
let Bot = require('../suda.js');

module.exports = {

    response: function(message){

        if(message.content.toLowerCase().includes("<@360963400781791243>")){

            if(message.content !== ":diamonds: What are you curious about? :diamonds:" && !message.author.bot && 
            
                    !message.content.startsWith("!") ){  

                let ms = message.content.substring(22, message.content.lenght);

                ms = ms.replace(/[?!.,]/g, '');
                
                let reply = Bot.bot.reply("local_user", ms);
                
                if(reply === "ERR: No Reply Matched"){
                
                    message.reply("```javascript\nSorry, I am not programmed to answer that yet. You can make me more intelligent by using:\n!sudaImp trigger 'key phrase' response 'key response'\n```");
                    
                }else {
                
                     message.reply(reply);
                
                }
            }
        }
    },

    addIntel: function(message){

        if(message.content.toLowerCase().startsWith('!sudaimp')){

            let content = message.content.substring(9, message.content.lenght);

            let triggerPos = content.search("trigger");
            let responsePos = content.search("response");

            let trigger = content.substring(triggerPos+8, responsePos);
            let response = content.substring(responsePos+9, content.lenght);

            addToFile(trigger, response);

            message.reply("Thank you for your contribution");
        }
    }
}

function addToFile(trigger, response){

    if(trigger.match(/[?!.,]/) != null){

        trigger = trigger.replace(/[?!.,]/g, '');
    } 

    let buffer = '\n' + '+ ' + trigger.toLowerCase() + '\n' + '- ' + response + '\n'; 

    fs.appendFile('./sudaIntel.rive', buffer, function(err, data){

        if (err) throw err;
        console.log(data);

    });
}



