(function () {
  angular
    .module('ItineraryPlanner')
    .controller('HomeController', homeController);

  function homeController($location, ItineraryService, PlaceService, $scope, loggedIn, $mdDialog) {
    var vm = this;
    vm.saveItinerary = saveItinerary;

    function init() {
      vm.control = {};
      vm.user = loggedIn;
      if (vm.user && vm.user.role === 'ADMIN') {
        $location.url('/admin');
        return;
      } else if (vm.user && vm.user.role === 'ADVERTISER') {
        $location.url('/place');
        return;
      }
      vm.places = [];
      initMap();
      PlaceService.findMostRecentAds().then(function (response) {
        vm.placesWithAds = response.data;
      }, function () {
        vm.placesWithAds = [];
      });
    }

    init();

    function initMap() {
      var fenway = { lat: 42.346268, lng: -71.095764 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: fenway
      });
      var options = {
        types: ['(regions)']
      };
      var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        new google.maps.Marker({
          position: coordinates,
          map: map
        });
        if (vm.places.length === 0) {
          map.setCenter(coordinates)
        }
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          if (response.data) { //that place already exists
            place._id = response.data._id;
            vm.places.push(place);
          } else {
            PlaceService.createPlace({
              googlePlaceId: place.place_id, name: place.name
            }).then(function (response) {
              place._id = response.data._id;
              vm.places.push(place);
            });
          }
        });
        $scope.$apply();
        input.focus();
        input.value = '';
      });
    }

    function saveItinerary() {
      var placeIds = $('.sortable-itinerary').sortable("toArray");
      ItineraryService.createItinerary(vm.user._id, { places: placeIds }).then(function (response) {
        $location.url('/itinerary/' + response.data._id);
      });
    }
  }
})();