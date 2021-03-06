module.exports = function () {
  var mongoose = require('mongoose');

  return mongoose.Schema({
    name: { type: String, required: true },
    googlePlaceId: { type: String, required: true, unique: true },
    reviews: [{
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
      },
      review: String,
      date: { type: Date, default: Date.now }
    }],
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    suggested: { type: Date },
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'places' });

};