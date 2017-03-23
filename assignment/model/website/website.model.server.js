module.exports = function () {

  var api = {
    createWebsiteForUser: createWebsiteForUser,
    findAllWebsitesForUser: findAllWebsitesForUser,
    findWebsiteById: findWebsiteById,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var WebsiteSchema = require('./website.schema.server')();
  var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

  return api;

  function createWebsiteForUser(userId, website) {
    website._user = userId;
    return WebsiteModel.create(website);
  }

  function findAllWebsitesForUser(userId) {
    return WebsiteModel.find({ _user: userId });
  }

  function findWebsiteById(websiteId) {
    return WebsiteModel.findById(websiteId);
  }

  function updateWebsite(websiteId, website) {
    return WebsiteModel.findOneAndUpdate({ _id: websiteId }, { $set: website });
  }

  function deleteWebsite(websiteId) {
    return WebsiteModel.findOneAndRemove({ _id: websiteId });
  }
};