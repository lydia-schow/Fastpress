var Promise = require('bluebird');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var db = require('./database.js');
var page = require('./page.js');

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


// Page

app.get('/pages', page.list);
app.get('/pages/create', page.createView);
app.post('/pages/create', page.create);
app.get('/pages/:pageId',  page.view);

// Site (TODO)

// User (TODO)

// Server

const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen( port, success );


// Generic Error Handling (TODO)
