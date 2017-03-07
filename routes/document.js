var Promise = require('bluebird');
var marked = require('marked');
var Doc = require('../models/document');

exports.list = (request, response) => {
  Doc.find()
  .then(docs => {
    response.render('list', {title: "Documents", item: items});
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.createView = (request, response) => {
  response.render('document-create');
};

exports.create = (request, response) => {
  Doc.create({body: request.body.body})
  .then( doc => {
    console.log(`Created document ${doc._id}`);
    response.redirect(`/documents/${doc._id}`);
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.view = (request, response) => {
  Doc.findById(request.params.id)
  .then(doc => {
    return Promise.promisify(marked)(doc.body); // promisify then invoke
  })
  .then(html => {
    response.render('view', {
      title: "Document",
      body: html
    });
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
  // TODO: 404 for non-existant pages
};

exports.edit = (request, response) => { response.send('Stub') };
exports.editView = (request, response) => { response.send('Stub') };
