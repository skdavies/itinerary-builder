module.exports = function () {
  var mongoose = require('mongoose');

  var WidgetSchema = mongoose.Schema({
    _page: { type: mongoose.Schema.Types.ObjectId, ref: 'PageModel', required: true },
    type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true },
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'assignment.widget' });

  return WidgetSchema;
};