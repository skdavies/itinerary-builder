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
    };

    function createItinerary(userId, itinerary) {
      return $http.post('/api/users/' + userId + '/itineraries', itinerary);
    }

    function findAllItineraries() {
      return $http.get('/api/itineraries');
    }

    function findItineraryById(itineraryId) {
      return $http.get('/api/itineraries/' + itineraryId);
    }

    function findItinerariesForUser(userId) {
      return $http.get('/api/users/' + userId + '/itineraries');
    }

    function updateItinerary(itineraryId, itinerary) {
      return $http.put('/api/itineraries/' + itineraryId, itinerary);
    }

    function deleteItinerary(itineraryId) {
      return $http.delete('/api/itineraries/' + itineraryId);
    }
  }

})();