module.exports = function () {

  var api = {
  };

  var mongoose = require('mongoose');

  var PageSchema = require('./page.schema.server')();
  var PageModel = mongoose.model('PageModel', PageSchema);

  return api;
};