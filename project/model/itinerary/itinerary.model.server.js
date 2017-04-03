module.exports = function () {

  var api = {
    createItinerary: createItinerary,
    findItineraryById: findItineraryById,
    findItinerariesForUser: findItinerariesForUser,
    updateItinerary: updateItinerary,
    deleteItinerary: deleteItinerary,
    reorderPlaces: reorderPlaces
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var ItinerarySchema = require('./itinerary.schema.server')();
  var ItineraryModel = mongoose.model('ItineraryModel', ItinerarySchema);

  return api;

  function createItinerary(itinerary) {
    return ItineraryModel.create(itinerary);
  }

  function findItineraryById(itineraryId) {
    return ItineraryModel.findById(itineraryId).populate('places');
  }

  function findItinerariesForUser(userId) {
    return ItineraryModel.find({ _user: userId });
  }

  function updateItinerary(itineraryId, itinerary) {
    return ItineraryModel.findOneAndUpdate({ _id: itineraryId }, { $set: itinerary })
  }

  function deleteItinerary(itineraryId) {
    return ItineraryModel.findOneAndRemove({ _id: itineraryId });
  }

  function reorderPlaces(itineraryId, places) {
    return ItineraryModel.findOneAndUpdate({ _id: itineraryId }, { $set: { places: places } });
  }
};