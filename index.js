var Promise = require('bluebird');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var db = require('./database');
var page = require('./routes/page');
var site = require('./routes/site');

var app = express();


// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( (request, response, next) => {
  console.log(`${request.method} ${request.path} ${JSON.stringify(request.params)}`);
  next();
});


// General
app.get('/', (request, response) => {
  response.render('index');
});

// Page
app.get('/sites/:sid/pages', page.list);
app.get('/sites/:sid/pages/create', page.createView);
app.post('/sites/:sid/pages/create', page.create);
app.get('/sites/:sid/pages/:pid/edit', page.editView);
app.post('/sites/:sid/pages/:pid/edit', page.edit);
app.get('/sites/:sid/pages/:pid', page.view);

// Site
app.get('/sites', site.list);
app.get('/sites/create', site.createView);
app.post('/sites/create', site.create);
app.get('/sites/:id/edit', site.editView);
app.post('/sites/:id/edit', site.edit);

// User (TODO)

// Server
const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen( port, success );

// Generic Error Handling (TODO)
