module.exports = function () {
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    role: { type: String, required: true, enum: ['ADMIN', 'USER', 'ADVERTISER'], default: 'USER' },
    itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItineraryModel' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'project_users' });

  UserSchema.plugin(require('mongoose-unique-validator'));
  return UserSchema;
};