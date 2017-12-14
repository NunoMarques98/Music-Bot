const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({

  musicTitle: String,
  musicLink: String,

})

const PlaylistSchema = new Schema({

  plName: String,
  musics: [MusicSchema]

})

const UserSchema = new Schema({

  userID: Number,
  bans: Number,
  playlists: [PlaylistSchema]

})

const User = mongoose.model('user', UserSchema);

module.exports = User;

module.exports.getUserById = (id, callback) => {

  const query = {userID: id};

  return new Promise( (resolve, reject) => {

    User.findOne(query).then( (data) => {

      resolve(data);

    })
  })
}

module.exports.checkUser = (id) => {

  const query = {userID: id};

  return new Promise( (resolve, reject) => {

    User.findOne(query).then( (data) => {

      let info = {isInDB: data !== null, data: data};

      resolve(info);

    })
  })
}

module.exports.createUser = (id) => {

  let user = new User({

    userID: id,
    bans: 0,
    playlists: []

  });

  user.save( (err) => {

      if(err) throw err;

  });
}
