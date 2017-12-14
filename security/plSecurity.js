let User = require('../models/playlistSchema');

module.exports = class SudaSecurity {

  constructor() {

  }

  checkExistanceAndName(id, plName){

    return new Promise( (resolve, reject) => {

      this.checkExistance(id).then( (isIn) =>{
        console.log(isIn);

          this.checkName(id, plName).then( (hasPl) => {

              let info = {isIn: isIn, hasPl: hasPl};

              let reply = this.reply(info);

              resolve(reply);
        })
      })
    })
  }

  checkExistance(id){

    return new Promise( (resolve, reject) => {

      User.checkUser(id).then( (info) => {

        resolve (info.isInDB);

      })
    });
  }

  checkName(id, name){

    return new Promise( (resolve, reject) =>  {

      User.checkUser(id).then( (info) => {

        let hasName = this.getIndex(info.data, name);

        resolve (hasName === -1);

      })
    });
  }

  getIndex(data, plName){

    return( data.playlists.findIndex( (playlist) =>{

        return playlist.plName === plName;

    })
  )}

  reply(info){

    if(info.isIn){

        if(info.hasPl) return({toAdd: true, msg: null});

        else return({toAdd: false, msg: " you have already one playlist with this name"});
    }

    else return({toAdd: false, msg: " you should register first! Try using !plRegister"});

  }
}
