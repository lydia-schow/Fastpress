var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = Schema({
  title: String,
  body: String,
  site: [Schema.Types.ObjectId],
  date: { type: Date, default: Date.now }
});

var SiteSchema = Schema({
  name: String,
  pages: [Schema.Types.ObjectId],
  date: { type: Date, default: Date.now }
});

SiteSchema.pre('save', next => {
  this.pages = this.pages || [];
  next();
});

module.exports = mongoose.model( 'Site', SiteSchema );
