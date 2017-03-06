var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = Schema({
  title: String,
  page_ids: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'Site', SiteSchema );
