(function () {
  angular
    .module('ItineraryPlanner')
    .controller('PlaceController', placeController);

  function placeController($location, $routeParams, PlaceService, loggedIn, UserService) {
    var vm = this;

    function init() {
      vm.place = null;
      var placeId = $routeParams['placeId'];
      if (placeId) {
        PlaceService.findPlaceById(placeId).then(function (response) {
          initMap(response.data);
        });
      } else {
        PlaceService.findMostRecentAds().then(function (response) {
          //TODO FORMAT THEN DISPLAY THESE
        });
      }
      vm.user = loggedIn;
      initAutocomplete();
    }

    init();

    function initAutocomplete() {
      var options = {};
      var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          var ourPlace = response.data;
          if (ourPlace) {
            $location.url('/place/' + ourPlace._id);
          } else {
            PlaceService.createPlace({ googlePlaceId: place.place_id, name: place.name }).then(function (response) {
              $location.url('/place/' + response.data._id);
            });
          }
        });
        input.focus();
        input.value = '';
      });
    }

    function initMap(myPlace) {
      var fenway = { lat: 42.346268, lng: -71.095764 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: fenway
      });
      var request = {
        placeId: myPlace.googlePlaceId
      };
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function (place, status) {
        if (status === 'OK') {
          var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          new google.maps.Marker({
            position: coordinates,
            map: map
          });
          map.setCenter(coordinates);
          place.googleReviews = place.reviews;
          delete place.reviews;
          vm.place = $.extend({}, myPlace, place);
        } else {
          vm.place = myPlace;
        }
      });
    }
  }
})();