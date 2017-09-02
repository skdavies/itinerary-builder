(function () {
  angular
    .module('ItineraryPlanner')
    .factory('PlaceService', placeService);

  function placeService($http) {
    return {
      'createPlace': createPlace,
      'findPlaceById': findPlaceById,
      'findPlaceByGoogleId': findPlaceByGoogleId,
      'findAllPlaces': findAllPlaces,
      'updatePlace': updatePlace,
      'deletePlace': deletePlace,
      'addPlaceReview': addPlaceReview
    };

    function createPlace(place) {
      return $http.post('/api/places', place);
    }

    function findPlaceById(placeId) {
      return $http.get('/api/places/' + placeId);
    }

    function findPlaceByGoogleId(googleId) {
      return $http.get('/api/places/google/' + googleId);
    }

    function findAllPlaces() {
      return $http.get('/api/places');
    }

    function updatePlace(placeId, place) {
      return $http.put('/api/places/' + placeId, place);
    }

    function deletePlace(placeId) {
      return $http.delete('/api/places/' + placeId);
    }

    function addPlaceReview(placeId, review) {
      return $http.post('/api/places/' + placeId + '/reviews', review);
    }
  }

})();