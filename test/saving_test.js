const assert = require('assert');
const User = require('../models/playlistSchema');

describe('Saving Records', function(){

  it('Saves a record to the database', function(done){

      let play = new User({

        userID: 123456,
        bans: 0,
        playlists: [ { plName: 'Test',
                       playlistID: 123456,
                       musics:
                            { musicTitle: "Hello",
                              musicLink: "http"}}]
      });

      play.save().then( function () {

        assert(play.isNew === false);
        done();

      });

  });

});
