var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = require('./database.js');
var Page = require('./Page.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/pages', (reqest, response) => {
  Page.find()
    .then(pages => {
      var output = '';
      pages.forEach(page => {
        output += `\n <a href="/pages/${page._id}">page _id: ${page._id}</a>`;
      });
      response.send(output);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send(error);
    })
})

app.get('/pages/:pageId', (request, response) => {
  console.log(`GET page ${request.params.pageId}`);
  Page.findById(request.params.pageId)
    .then(page => {
      return page.render();
    })
    .then(html => {
      response.send(html);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send(error);
    })
});

app.post('/pages', (request, response) => {
  console.log('POST a new page');
  response.send('Request received');
});

var port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Listening at port ${port}`); });
