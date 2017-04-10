module.exports = function () {
  var mongoose = require('mongoose');

  return mongoose.Schema({
    name: { type: String, required: true },
    googlePlaceId: { type: String, required: true, unique: true },
    reviews: [{
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectUserModel'
      },
      review: String
    }],
    ads: [{
      advertiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectUserModel'
      },
      ad: String
    }],
    suggested: { type: Date },
    dateCreated: { type: Date, default: Date.now }
  }, { collection: 'project_places' });

};