var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
