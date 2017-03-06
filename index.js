var Promise = require('bluebird');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var db = require('./database');
var page = require('./page');
var site = require('./site');

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
app.get('/pages', page.list);
app.get('/pages/create', page.createView);
app.post('/pages/create', page.create);
app.post('/pages/:id/', page.edit);
app.get('/pages/:id', page.view);

// Site
app.get('/sites', site.list);
app.get('/sites/create', site.createView);
app.post('/sites/create', site.create);
app.post('/sites/:id/', site.edit);
app.get('/sites/:id/', site.view);
app.get('/sites/:id/:page', site.view);

// User (TODO)

// Server
const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen( port, success );

// Generic Error Handling (TODO)
