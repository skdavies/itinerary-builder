module.exports = function () {
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'assignment_users' });

  return UserSchema;
};