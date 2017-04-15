module.exports = function () {

  var api = {
    createPlace: createPlace,
    findPlaceById: findPlaceById,
    findAllPlaces: findAllPlaces,
    findPlaceByGoogleId: findPlaceByGoogleId,
    findMostRecentAds: findMostRecentAds,
    addPlaceReview: addPlaceReview,
    addPlaceAd: addPlaceAd,
    updatePlace: updatePlace,
    deletePlace: deletePlace
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var PlaceSchema = require('./place.schema.server')();
  var PlaceModel = mongoose.model('PlaceModel', PlaceSchema);

  return api;

  function createPlace(place) {
    return PlaceModel.create(place);
  }

  function findAllPlaces() {
    return PlaceModel.find();
  }

  function findPlaceById(placeId) {
    return PlaceModel.findById(placeId);
  }

  function findPlaceByGoogleId(googleId) {
    return PlaceModel.findOne({ googlePlaceId: googleId });
  }

  function addPlaceReview(userId, placeId, review) {
    return PlaceModel.findOneAndUpdate({ _id: placeId },
      {
        $addToSet: {
          reviews: {
            reviewer: userId,
            review: review
          }
        }
      },
      { new: true });
  }

  function addPlaceAd(userId, placeId, ad) {
    return PlaceModel.findOneAndUpdate({ _id: placeId },
      {
        $addToSet: { ads: { advertiser: userId, ad: ad } },
        $set: { suggested: Date.now }
      },
      { new: true });
  }

  function findMostRecentAds() {
    return PlaceModel.find({ suggested: { $exists: true } }).sort({ suggested: -1 });
  }

  function updatePlace(placeId, place) {
    return PlaceModel.findOneAndUpdate({ _id: placeId }, { $set: place }, { new: true });
  }

  function deletePlace(placeId) {
    return PlaceModel.findOneAndRemove({ _id: placeId });
  }
};