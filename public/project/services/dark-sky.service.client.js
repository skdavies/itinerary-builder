(function () {
  angular
    .module('ItineraryPlanner')
    .factory('DarkSkyService', darkSkyService);

  function darkSkyService($http) {

    return {
      'timeMachineLookup': timeMachineLookup
    };

    function timeMachineLookup(lat, lon, time) {
      return $http.get('/project/api/darksky/lookup?lat=' + lat + '&lon=' + lon + '&time=' + time);
    }

  }

})();