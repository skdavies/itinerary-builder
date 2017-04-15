(function () {
  angular
    .module('ItineraryPlanner')
    .controller('PlaceSearchController', placeSearchController);

  function placeSearchController($location, PlaceService, loggedIn) {
    var vm = this;

    function init() {
      vm.place = null;
      PlaceService.findMostRecentAds().then(function (response) {
        //TODO FORMAT THEN DISPLAY THESE
      });
      vm.user = loggedIn;
      initAutocomplete();
    }

    init();

    function initAutocomplete() {
      var options = {
        types: ['(regions)']
      };
      var input = document.getElementById('autocomplete-place-search');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          var myPlace = response.data;
          if (myPlace) {
            $location.url('/place/' + myPlace._id);
            // initMap(myPlace);
          } else {
            PlaceService.createPlace({ googlePlaceId: place.place_id, name: place.name }).then(function (response) {
              $location.url('/place/' + response.data._id);
              // initMap(response.data);
            });
          }
        });
        input.focus();
        input.value = '';
      });
    }
  }
})();