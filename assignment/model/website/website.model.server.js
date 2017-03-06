module.exports = function () {

  var api = {
  };

  var mongoose = require('mongoose');

  var WebsiteSchema = require('./website.schema.server')();
  var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

  return api;
};