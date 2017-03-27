module.exports = function () {
  var mongoose = require('mongoose');

  return mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItineraryModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'project_users' });

};