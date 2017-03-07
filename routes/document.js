var Promise = require('bluebird');
var marked = require('marked');
var Doc = require('../models/document');

exports.list = (request, response) => {
  Doc.find()
  .then(docs => {
    response.render('list', {title: "Documents", items: docs});
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.createView = (request, response) => {
  response.render('document-form', {action: 'create'});
};

exports.create = (request, response) => {
  Doc.create({body: request.body.body})
  .then( doc => {
    console.log('body', doc.body);
    console.log(`Created document ${doc._id}`);
    response.redirect(`/documents/${doc._id}/edit`);
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.editView = (request, response) => {
  Doc.findById(request.params.id)
  .then(doc => {
    response.render('document-form', {action: 'edit', body: doc.body});
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.edit = (request, response) => {
  Doc.findById(request.params.id)
  .then(doc => {
    doc.body = request.body.body;
    return doc.save();
  })
  .then(doc => {
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
