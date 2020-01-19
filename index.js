const bodyParser = require('body-parser');
const express = require('express');
const router = require('express-promise-router')();
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // always create a session
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: require('./database') })
}));
app.use('/', express.static('public'));

/** Routes **/

// Index
router.get('/', (request, response) => {
  response.render('index');
});

// Document
const doc = require('./controllers/document');
router.get('/documents/', doc.list);
router.route('/documents/create')
  .get(doc.createView)
  .post(doc.create);
router.get('/documents/:id', doc.view);
router.route('/documents/create')
  .get(doc.editView)
  .post(doc.edit);

// Errors
const error = require('./error');
router.use(error.handle);

app.use(router);

/** Start Server **/
const port = process.env.PORT || 3000;
const success = () => { console.log(`Listening at port ${port}`); };
app.listen(port, success);

