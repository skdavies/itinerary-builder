module.exports = function () {
  var mongoose = require('mongoose');

  var PageSchema = mongoose.Schema({
    _website: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel', required: true },
    name: { type: String, required: true },
    title: String,
    description: String,
    widgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'assignment.page' });

  return PageSchema;
};