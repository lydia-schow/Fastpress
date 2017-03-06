var Promise = require('bluebird');
var marked = require('marked');
var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

Page = mongoose.model( 'Page', PageSchema );

exports.list = (reqest, response) => {
  Page.find()
  .then(pages => {
    var output = 'Pages:\n';
    pages.forEach(page => {
      output += `<a href="/pages/${page._id}">page _id: ${page._id}</a>\n`;
    });
    response.send(output);
  });
};

exports.create = (request, response) => {
  Page.create({
    title: request.body.title,
    body: request.body.body
  })
  .then( page => {
    console.log(`Created page ${page._id}`);
    response.redirect(`/pages/${page._id}`);
  });
};

exports.createView = (request, response) => {
  response.render('page-create');
};

exports.view = (request, response) => {
  let pageTitle;
  Page.findById(request.params.pageId)
  .then(page => {
    pageTitle = page.title;
    return Promise.promisify(marked)(page.body); // promisify then invoke
  })
  .then(html => {
    response.render('page', {
      title: pageTitle,
      body: html
    });
  });
  // TODO: 404 for non-existant pages
};
