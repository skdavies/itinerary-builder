module.exports = function () {

  var api = {
  };

  var mongoose = require('mongoose');

  var WidgetSchema = require('./widget.schema.server')();
  var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

  return api;
};