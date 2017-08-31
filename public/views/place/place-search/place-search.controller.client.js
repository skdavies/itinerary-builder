(function () {
  angular
    .module('ItineraryPlanner')
    .controller('PlaceSearchController', placeSearchController);

  function placeSearchController($location, PlaceService, loggedIn) {
    var vm = this;
    vm.viewPlace = viewPlace;

    function init() {
      vm.place = null;
      vm.user = loggedIn;
      initAutocomplete();
    }

    init();

    function initAutocomplete() {
      var options = {};
      var input = document.getElementById('autocomplete-place-search');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          var myPlace = response.data;
          if (myPlace) {
            $location.url('/place/' + myPlace._id);
          } else {
            PlaceService.createPlace({
              googlePlaceId: place.place_id,
              name: place.name,
              lat: coordinates.lat,
              lng: coordinates.lng
            }).then(function (response) {
              $location.url('/place/' + response.data._id);
            });
          }
        });
        input.focus();
        input.value = '';
      });
    }

    function viewPlace(place) {
      $location.url('/place/' + place._id);
    }
  }
})();