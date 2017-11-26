const assert = require('assert');
const User = require('../models/playlistSchema');

describe('Updating Records', () => {

  let play;

  beforeEach( (done) => {

    play = new User({

      userID: 123456,
      bans: 0,
      playlists: [ { plName: 'Test',
                     playlistID: 123456,
                     musics:
                          { musicTitle: "Hello",
                            musicLink: "http"}}]
    });

    play.save().then( () => {

      done();
    });

  });

  it('Updates one record from the database', (done) => {

      User.findOneAndUpdate({userID: 123456}, {bans: 1}).then( (data) =>{

        User.findOne({userID: 123456}).then( (data) => {

          assert(data.bans === 1);

          done();

          });
        });
    });
});
