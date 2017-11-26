const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({

  musicTitle: String,
  musicLink: String,

})

const PlaylistSchema = new Schema({

  plName: String,
  playlistID: Number,
  musics: [MusicSchema]

})

const UserSchema = new Schema({

  userID: Number,
  bans: Number,
  playlists: [PlaylistSchema]

})

const User = mongoose.model('user', UserSchema);

module.exports = User;
