var mongoose = require('mongoose');
var Promise = require('bluebird');
var marked = require('marked');

var PageSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

var Page = mongoose.model( 'Page', PageSchema );

PageSchema.method.render = () => {
  return Promise.promisify(
    marked(this.body)
  );
}

module.exports = Page;
