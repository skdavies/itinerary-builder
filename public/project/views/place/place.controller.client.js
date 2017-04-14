(function () {
  angular
    .module('ItineraryPlanner')
    .controller('PlaceController', placeController);

  function placeController($location, $routeParams, PlaceService, loggedIn, $scope, DarkSkyService) {
    var vm = this;
    vm.lookupWeather = lookupWeather;

    function init() {
      vm.place = null;
      vm.weather = {
        selected: null,
        maxDate: new Date(),
        forecast: null
      };
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
      var options = {
        types: ['(regions)']
      };
      var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          var myPlace = response.data;
          if (myPlace) {
            initMap(myPlace);
          } else {
            PlaceService.createPlace({ googlePlaceId: place.place_id, name: place.name }).then(function (response) {
              initMap(response.data);
            });
          }
        });
        input.focus();
        input.value = '';
      });
    }

    function initMap(myPlace) {
      var request = {
        placeId: myPlace.googlePlaceId
      };
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function (place, status) {
        if (status === 'OK') {
          var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: coordinates
          });
          new google.maps.Marker({
            position: coordinates,
            map: map
          });
          // map.setCenter(coordinates);
          place.googleReviews = place.reviews;
          delete place.reviews;
          vm.place = $.extend({}, myPlace, place);
          console.log(vm.place);
        } else {
          vm.place = myPlace;
        }
        $scope.$apply();
      });
    }

    function lookupWeather() {
      var date = vm.weather.selected;
      if (date) {
        DarkSkyService.timeMachineLookup(vm.place.geometry.location.lat(), vm.place.geometry.location.lng(), date.getTime() / 1000)
          .then(function (response) {
            vm.weather.forecast = JSON.parse(response.data);
            console.log(vm.weather.forecast);
          }, function (err) {
          });
      }
    }
  }
})();