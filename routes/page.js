var Promise = require('bluebird');
var marked = require('marked');
var Site = require('../models/site');
var Page = require('../models/page');

exports.list = (request, response) => {
  Site.findById(request.params.sid, 'pages')
  .then( site => {
    return Page.find({'_id': { '$in': site.pages }});
  })
  .then(pages => {
    response.render('page-list', {pages: pages});
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.createView = (request, response) => {
  response.render('page-create');
};

exports.create = (request, response) => {
  let parentSite;
  Site.findById(request.params.sid, 'pages')
  .then( site => {
    parentSite = site;
    return Page.create({
      title: request.body.title,
      body: request.body.body,
      site: site._id
    });
  })
  .then( page => {
    parentSite.pages.push(page._id);
    parentSite.save();
    console.log(`Created page ${page._id}`);
    response.redirect(`/sites/${parentSite._id}/pages/${page._id}`);
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
};

exports.view = (request, response) => {
  let pageTitle;
  Site.findById(request.params.sid)
  .then(site => {
    console.log('site', site);
    return Page.findById(
      site.pages.filter( id => {
        return id === request.params.pid
      })
    );
  })
  .then(page => {
    console.log('page', page);
    if(!page) {
      return Promise.reject('404 - Not Found');
    }
    pageTitle = page.title;
    return Promise.promisify(marked)(page.body); // promisify then invoke
  })
  .then(html => {
    response.render('page-view', {
      title: pageTitle,
      body: html
    });
  })
  .catch(error => {console.error(error);response.status(500).send('Internal error')});
  // TODO: 404 for non-existant pages
};

exports.edit = (request, response) => { response.send('Stub') };
exports.editView = (request, response) => { response.send('Stub') };
