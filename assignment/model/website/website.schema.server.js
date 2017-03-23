module.exports = function () {
  var mongoose = require('mongoose');

  var WebsiteSchema = mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    name: { type: String, required: true },
    description: String,
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'assignment_websites' });

  return WebsiteSchema;
};