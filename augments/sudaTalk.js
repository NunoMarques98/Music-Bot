let fs = require('fs');
let Bot = require('../suda.js');

module.exports = class SudaTalk {

  constructor() {

    this.message;

  }

  handler(command, message){

    this.message = message;

    if(command === "!sudaImp"){

      this.addIntel();

    } else {

      this.response();

    }
  }

  response(){

    if(this.message.content.toLowerCase().includes("<@360963400781791243>")){

        if(this.message.content !== ":diamonds: What are you curious about? :diamonds:" && !this.message.author.bot &&

                !this.message.content.startsWith("!") ){

            let ms = this.message.content.substring(22, this.message.content.lenght);

            ms = ms.replace(/[?!.,]/g, '');

            let reply = Bot.bot.reply("local_user", ms);

            if(reply === "ERR: No Reply Matched"){

                this.message.reply("```javascript\nSorry, I am not programmed to answer that yet. You can make me more intelligent by using:\n!sudaImp trigger 'key phrase' response 'key response'\n```");

            } else {

                 this.message.reply(reply);

            }
        }
    }
}

  addIntel(message){

      let content = this.message.content.substring(9, this.message.content.lenght);

      let triggerPos = content.search("trigger");
      let responsePos = content.search("response");

      let trigger = content.substring(triggerPos+8, responsePos);
      let response = content.substring(responsePos+9, content.lenght);

      this.addToFile(trigger, response);

      this.message.reply("Thank you for your contribution");

  }

  addToFile(trigger, response){

    if(trigger.match(/[?!.,]/) != null){

        trigger = trigger.replace(/[?!.,]/g, '');
    }

    let buffer = '\n' + '+ ' + trigger.toLowerCase() + '\n' + '- ' + response + '\n';

    fs.appendFile('./sudaIntel.rive', buffer, function(err, data){

        if (err) throw err;
        console.log(data);

    });
  }
}
