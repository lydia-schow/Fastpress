var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'Page', PageSchema );
