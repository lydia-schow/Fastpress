var Promise = require('bluebird');
var Doc = require('../models/document');
var markdown = require('markdown-it')();

exports.list = (request, response) => (
  Doc.find({session: request.sessionID})
     .then(docs => {
       response.render('document/list', {title: "Documents", items: docs})
     })
);

exports.createView = (request, response) => response.render('document/create');

exports.create = (request, response) => (
  Doc.create({
    body: request.body.body,
    html: markdown.render(request.body.body),
    session: request.sessionID
  })
  .then(doc => response.redirect(`/documents/${doc._id}`))
);

exports.editView = (request, response) => (
  Doc.findById(request.params.id)
  .then(doc => {
    if (doc.session !== request.sessionID) {
      return Promise.reject({status: 403});
    }
    response.render('document/edit', {body: doc.body});
  })
);

exports.edit = (request, response) => (
  Doc.findById(request.params.id)
     .then(doc => {
        if(doc.session !== request.sessionID){
          return Promise.reject({status: 403});
        }
        doc.body = request.body.body;
        doc.html = markdown.render(request.body.body);
        return doc.save();
     })
     .then(doc => response.redirect(`/documents/${doc._id}`))
);

exports.view = (request, response) => (
  Doc.findById(request.params.id)
  .then(doc => {
    if(!doc.html){
      doc.html = markdown.render(doc.body);
      doc.save();
    }
    response.render('document/view', {
      title: "Document - Fastpress",
      html: doc.html,
      id: doc._id,
      isOwner: doc.session === request.sessionID
    });
  })
);

// TODO: 404 for non-existant pages
