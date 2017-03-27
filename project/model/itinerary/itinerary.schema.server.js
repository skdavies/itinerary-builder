module.exports = function () {
  var mongoose = require('mongoose');

  return mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel' },
    name: { type: String, required: true },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlaceModel' }],
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'project_itineraries' });

};