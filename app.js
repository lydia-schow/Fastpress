var Promise = require('bluebird');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var marked = require('marked');

var db = require('./database.js');
var Page = require('./Page.js');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( (request, response, next) => {
  console.log(`${request.method} ${request.path} ${JSON.stringify(request.params)}`);
  next();
});

app.get('/pages', (reqest, response) => {
  Page.find()
    .then(pages => {
      var output = 'Pages:\n';
      pages.forEach(page => {
        output += `<a href="/pages/${page._id}">page _id: ${page._id}</a>\n`;
      });
      response.send(output);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send(error);
    })
})

app.get('/pages/:pageId', (request, response) => {
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
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('500 - Server error');
    })
    // TODO: 404 for non-existant pages
});

app.post('/pages', (request, response) => {
  Page.create({
    title: request.body.title,
    body: request.body.body
  })
    .then( page => {
      console.log(`Created page ${page._id}`);
      response.redirect(`/response/${page._id}`);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('500 - Server error');
    });
});

var port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Listening at port ${port}`); });
