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
      'addPlaceReview': addPlaceReview,
      'addPlaceAd': addPlaceAd
    };

    function createPlace(place) {
      return $http.post('/project/api/places', place);
    }

    function findPlaceById(placeId) {
      return $http.get('/project/api/places/' + placeId);
    }

    function findPlaceByGoogleId(googleId) {
      return $http.get('/project/api/places/google/' + googleId);
    }

    function findAllPlaces() {
      return $http.get('/project/api/places');
    }

    function updatePlace(placeId, place) {
      return $http.put('/project/api/places/' + placeId, place);
    }

    function deletePlace(placeId) {
      return $http.delete('/project/api/places/' + placeId);
    }

    function addPlaceReview(placeId, review) {
      return $http.post('/project/api/places/' + placeId + '/reviews', review);
    }

    function addPlaceAd(placeId, ad) {
      return $http.post('/project/api/places/' + placeId + '/ads', ad);
    }
  }

})();