(function () {
  angular
    .module('ItineraryPlanner')
    .factory('ItineraryService', itineraryService);

  function itineraryService($http) {
    return {
      'createItinerary': createItinerary,
      'findAllItineraries': findAllItineraries,
      'findItineraryById': findItineraryById,
      'findItinerariesForUser': findItinerariesForUser,
      'updateItinerary': updateItinerary,
      'deleteItinerary': deleteItinerary,
      'reorderPlaces': reorderPlaces
    };

    function createItinerary(userId, itinerary) {
      return $http.post('/project/api/users/' + userId + '/itineraries', itinerary);
    }

    function findAllItineraries() {
      return $http.get('/project/api/itineraries');
    }

    function findItineraryById(itineraryId) {
      return $http.get('/project/api/itineraries/' + itineraryId);
    }

    function findItinerariesForUser(userId) {
      return $http.get('/project/api/users/' + userId + '/itineraries');
    }

    function updateItinerary(itineraryId, itinerary) {
      return $http.put('/project/api/itineraries/' + itineraryId, itinerary);
    }

    function deleteItinerary(itineraryId) {
      return $http.delete('/project/api/itineraries/' + itineraryId);
    }

    function reorderPlaces(itineraryId, places) {
      return $http.put('/project/api/itineraries/' + itineraryId + '/places/reorder', places);
    }
  }

})();