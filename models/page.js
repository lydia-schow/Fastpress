var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = mongoose.Schema({
  title: String,
  body: String,
  site: [{type: Schema.Types.ObjectId, ref: 'Site'}],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model( 'Page', PageSchema );
