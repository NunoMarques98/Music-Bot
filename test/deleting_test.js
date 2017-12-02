const assert = require('assert');
const User = require('../models/playlistSchema');

describe('Deleting Records', () => {

  let user;

  beforeEach( (done) => {

    user = new User({

      userID: 123456,
      bans: 0,
      playlists: [ { plName: 'Test',
                     playlistID: 123456,
                     musics:
                          { musicTitle: "Hello",
                            musicLink: "http"}}]
    });


    user.save().then( () => {

      done();
    });

  });

  it('Deletes one record from the database', (done) => {

      User.findOneAndRemove({userID: 123456}).then( (data) =>{

        User.findOne({userID: 123456}).then((data) => {

          assert(data === null);

          done();
        });

      });

  });

});
