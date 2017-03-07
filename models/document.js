var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = Schema({
  body: String,
  session: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'Document', DocumentSchema );
