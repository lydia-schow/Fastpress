var Promise = require('bluebird');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var session = require('express-session');

var db = require('./database');
var env = require('./env/environment');

var site = require('./routes/site');
var doc = require('./routes/document');

var app = express();


// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // always create a session
  secret: env.sessionSecret
}));
app.use( (request, response, next) => {
  console.log(`${request.method} ${request.path} ${JSON.stringify(request.params)}`);
  next();
});

// General
app.get('/', (request, response) => {
  response.render('index');
});


// Document
app.get('/documents/', doc.list);
app.get('/documents/create', doc.createView);
app.post('/documents/create', doc.create);

app.get('/documents/:id', doc.view);
app.get('/documents/:id/edit', doc.editView);
app.post('/documents/:id/edit', doc.edit);


// Server
const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen( port, success );


// Generic Error Handling (TODO)
