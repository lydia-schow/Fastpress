var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var DocumentSchema = Schema({
  _id: { type: String, unique: true, default: shortid.generate },
  body: String,
  session: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'Document', DocumentSchema );
