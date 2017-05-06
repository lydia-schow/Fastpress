const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);

const db = require('./database');
const error = require('./error');
const env = require('./env/environment');
const doc = require('./controllers/document');

const app = express();

// Improve security
app.use(helmet());

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // always create a session
  secret: env.sessionSecret,
  store: new MongoStore({ mongooseConnection: db })
}));

// Static files
app.use('/', express.static('public'));

// General
app.get('/', (request, response) => {
  response.render('index');
});

// Document
app.get('/documents/', doc.list);
app.route('/documents/create')
  .get(doc.createView)
  .post(doc.create);
app.get('/documents/:id', doc.view);
app.route('/documents/create')
  .get(doc.editView)
  .post(doc.edit);

// Errors
app.use(error.handle);

// Start Server
const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen( port, success );

// Generic Error Handling (TODO)
