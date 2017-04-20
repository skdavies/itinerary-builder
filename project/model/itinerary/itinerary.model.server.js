module.exports = function () {

  var api = {
    createItinerary: createItinerary,
    findItineraryById: findItineraryById,
    findItinerariesForUser: findItinerariesForUser,
    findAllItineraries: findAllItineraries,
    updateItinerary: updateItinerary,
    deleteItinerary: deleteItinerary
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var ItinerarySchema = require('./itinerary.schema.server')();
  var ItineraryModel = mongoose.model('ItineraryModel', ItinerarySchema);

  return api;

  function findAllItineraries() {
    return ItineraryModel.find().populate('_user', 'username');
  }

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
    return ItineraryModel.findOneAndUpdate({ _id: itineraryId }, { $set: itinerary }, { new: true })
  }

  function deleteItinerary(itineraryId) {
    return ItineraryModel.findOneAndRemove({ _id: itineraryId });
  }
};