var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/fastpress')
  .then( () => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.error(`Database connection failed:\n${error}`);
  });

module.exports = db;