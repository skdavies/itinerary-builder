module.exports = function () {
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItineraryModel' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'project_users' });

  UserSchema.plugin(require('mongoose-unique-validator'));
  return UserSchema;
};