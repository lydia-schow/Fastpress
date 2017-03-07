var Promise = require('bluebird');
var Site = require('../models/site');

exports.list = (request, response) => {
  Site.find().then(sites => {
    response.render('site-list', {sites: sites});
  });
}

exports.create = (request, response) => {
  Site.create({
    // TODO: form validation
    name: request.body.name,
    // url: request.body.url.replace(/[^a-zA-Z\_\-0-9]/g, '')
  })
  .then( site => {
    console.log(`Created site ${site._id}`);
    response.redirect(`/sites/${site._id}/edit`);
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
}

exports.createView = (request, response) => {
  response.render('site-create');
}

exports.editView = (request, response) => {
  Site.findById(request.params.id)
  .then(site => {
    response.render('site-edit', site);
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
}

exports.view = (request, response) => { response.send('Stub'); }

exports.edit = (request, response) => { response.send('Stub'); }
