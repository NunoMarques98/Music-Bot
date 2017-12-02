const assert = require('assert');
const User = require('../models/playlistSchema');

describe('Finding Records', () => {

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

  it('Finds one record from the database', (done) => {

      User.findOne({userID: 123456}).then( (data) =>{

        assert(data.userID === 123456);

        done();
      })

  });

  it('Finds one record by ID from the database', (done) => {

      User.findOne({_id: play._id }).then( (data) =>{

        assert(data._id.toString() === play._id.toString());

        done();
      })

  });

});
