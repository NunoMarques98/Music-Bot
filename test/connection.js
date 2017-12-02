const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before( (done) => {

  mongoose.connect('mongodb://localhost/playlist');

  mongoose.connection.once('open', () => {

    console.log("Connection established!");

    done();

  }).on('error', (err) => {

    console.log(err);
  })
});

beforeEach( (done) =>{

  mongoose.connection.collections.users.drop( () => {

    done();
  });

})
