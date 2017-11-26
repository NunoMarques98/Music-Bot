const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../models/playlistSchema');

describe('Nesting records', () => {

  beforeEach( (done) => {

    mongoose.connection.collections.users.drop( () => {

      done();
    })
  })

  it('Creates user with sub-documents', (done) => {

      let user = new User({

      userID: 123456,
      bans: 0,
      playlists: [ { plName: 'Test',
                     playlistID: 123456,
                     musics:
                          { musicTitle: "Hello",
                            musicLink: "http"}}]
    });

    user.save().then( () => {

      User.findOne({userID: 123456}).then( (data) => {

        assert(data.playlists.length === 1);

        done();

      })

    })

  })

  it('Adds a playlist to a user', (done) => {

    let user = new User({

    userID: 123456,
    bans: 0,
    playlists: [ { plName: 'Test',
                   playlistID: 123456,
                   musics:
                        { musicTitle: "Hello",
                          musicLink: "http"}}]
    });

    user.save().then( () => {

      User.findOne({userID: 123456}).then( (data) => {

        data.playlists.push({ plName: 'Test2',
                              playlistID: 123987,
                              musics:
                            { musicTitle: "Bye",
                              musicLink: "http2"}})

        data.save().then( () => {

          User.findOne({userID: 123456}).then( (data) => {

            assert(data.playlists.length === 2)

            done();

          })
        })
      })
    })
  })
})
