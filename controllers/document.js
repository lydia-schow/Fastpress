var Promise = require('bluebird');
var Doc = require('../models/document');
var markdown = require('markdown-it')();

exports.list = (request, response, next) => {
  Doc.find({session: request.sessionID})
  .then(docs => {
    response.render('document/list', {title: "Documents", items: docs});
  })
  .catch(next);
};

exports.createView = (request, response, next) => {
  response.render('document/create');
};

exports.create = (request, response, next) => {
  Doc.create({
    body: request.body.body,
    html: markdown.render(request.body.body),
    session: request.sessionID
  })
  .then( doc => {
    response.redirect(`/documents/${doc._id}`);
  })
  .catch(next);
};

exports.editView = (request, response, next) => {
  Doc.findById(request.params.id)
  .then(doc => {
    if(doc.session !== request.sessionID){
      return Promise.reject({status: 403});
    }
    response.render('document/edit', {body: doc.body});
  })
  .catch(next);
};

exports.edit = (request, response, next) => {
  Doc.findById(request.params.id)
  .then(doc => {
    if(doc.session !== request.sessionID){
      return Promise.reject({status: 403});
    }
    doc.body = request.body.body;
    doc.html = markdown.render(request.body.body)
    return doc.save();
  })
  .then(doc => {
    response.redirect(`/documents/${doc._id}`);
  })
  .catch(next);
};

exports.view = (request, response, next) => {
  Doc.findById(request.params.id)
  .then(doc => {
    if(!doc.html){
      doc.html = markdown.render(doc.body);
      doc.save();
    }
    return response.render('document/view', {
      title: "Document - Fastpress",
      html: doc.html,
      id: doc._id,
      isOwner: doc.session === request.sessionID
    });
  })
  .catch(next);
  // TODO: 404 for non-existant pages
};
