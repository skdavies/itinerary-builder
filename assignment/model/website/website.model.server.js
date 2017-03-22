module.exports = function () {

  var api = {
    createWebsiteForUser: createWebsiteForUser,
    findAllWebsitesForUser: findAllWebsitesForUser,
    findWebsiteById: findWebsiteById,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite
  };

  var mongoose = require('mongoose');
  var q = require('q');

  var WebsiteSchema = require('./website.schema.server')();
  var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

  return api;

  function createWebsiteForUser(userId, website) {
    var deferred = q.defer();
    website._user = userId;
    WebsiteModel.create(website, function (err, websiteObj) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(websiteObj);
      }
    });
    return deferred.promise;
  }

  function findAllWebsitesForUser(userId) {
    var deferred = q.defer();
    WebsiteModel.find({ _user: userId }, function (err, websites) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(websites);
      }
    });
    return deferred.promise;
  }

  function findWebsiteById(websiteId) {
    var deferred = q.defer();
    WebsiteModel.findById(websiteId, function (err, website) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(website);
      }
    });
    return deferred.promise;
  }

  function updateWebsite(websiteId, website) {
    var deferred = q.defer();
    WebsiteModel.findOneAndUpdate({ _id: websiteId }, { $set: website }, function (err, website) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(website);
      }
    });
    return deferred.promise;
  }

  function deleteWebsite(websiteId) {
    var deferred = q.defer();
    WebsiteModel.findOneAndRemove({ _id: websiteId }, function (err, website) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(website);
      }
    });
    return deferred.promise;
  }
};