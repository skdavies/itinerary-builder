module.exports = function () {
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String },
    firstName: String,
    lastName: String,
    role: { type: String, required: true, enum: ['ADMIN', 'USER'], default: 'USER' },
    itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItineraryModel' }],
    following: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
      count: { type: Number, default: 0 }
    },
    followers: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
      count: { type: Number, default: 0 }
    },
    dateCreated: { type: Date, default: Date.now },
    google: {
      id: String
    },
    facebook: {
      id: String
    }
  }, { collection: 'users' });

  UserSchema.plugin(require('mongoose-unique-validator'));
  return UserSchema;
};