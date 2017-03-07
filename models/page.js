var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = Schema({
  title: String,
  body: String,
  site: [Schema.Types.ObjectId],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'Page', PageSchema );
