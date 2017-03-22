module.exports = function () {

  var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage
  };

  var mongoose = require('mongoose');
  var q = require('q');

  var PageSchema = require('./page.schema.server')();
  var PageModel = mongoose.model('PageModel', PageSchema);

  return api;

  function createPage(websiteId, page) {
    var deferred = q.defer();
    page._website = websiteId;
    PageModel.create(page, function (err, page) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(page);
      }
    });
    return deferred.promise;
  }

  function findAllPagesForWebsite(websiteId) {
    var deferred = q.defer();
    PageModel.find({ _website: websiteId }, function (err, websites) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(websites);
      }
    });
    return deferred.promise;
  }

  function findPageById(pageId) {
    var deferred = q.defer();
    PageModel.findById(pageId, function (err, website) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(website);
      }
    });
    return deferred.promise;
  }

  function updatePage(pageId, page) {
    var deferred = q.defer();
    PageModel.findOneAndUpdate({ _id: pageId }, { $set: page }, function (err, page) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(page);
      }
    });
    return deferred.promise;
  }

  function deletePage(pageId) {
    var deferred = q.defer();
    PageModel.findOneAndRemove({ _id: pageId }, function (err, page) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(page);
      }
    });
    return deferred.promise;
  }
};