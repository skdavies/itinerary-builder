module.exports = function () {

  var userModel = require('./user/user.model.server.js')();
  var placeModel = require('./place/place.model.server')();
  var itineraryModel = require('./itinerary/itinerary.model.server')();

  return {
    userModel: userModel,
    placeModel: placeModel,
    itineraryModel: itineraryModel
  };
};
