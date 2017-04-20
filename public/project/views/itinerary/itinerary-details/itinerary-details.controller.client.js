(function () {
  angular
    .module('ItineraryPlanner')
    .controller('ItineraryDetailsController', itineraryDetailsController);

  function itineraryDetailsController($location, $routeParams, ItineraryService, PlaceService, $scope, loggedIn) {
    var vm = this;
    vm.saveItinerary = saveItinerary;
    vm.resetToLastSave = resetToLastSave;

    function init() {
      vm.itinId = $routeParams['itinId'];
      vm.user = loggedIn;
      if (vm.user && vm.user.role === 'ADMIN') {
        $location.url('/admin');
        return;
      } else if (vm.user && vm.user.role === 'ADVERTISER') {
        $location.url('/place');
        return;
      }
      initMap();
      ItineraryService.findItineraryById(vm.itinId).then(function (response) {
        vm.itinerary = response.data;
        vm.places = response.data.places;
      });
      vm.dirty = false;
    }

    init();

    function initMap() {
      var fenway = { lat: 42.346268, lng: -71.095764 };
      var map = new google.maps.Map(document.getElementById('map-itin-details'), {
        zoom: 4,
        center: fenway
      });
      var options = {
        types: ['(regions)']
      };
      var input = document.getElementById('autocomplete-itin-details');
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
            vm.dirty = true;
          } else {
            PlaceService.createPlace({
              googlePlaceId: place.place_id, name: place.name
            }).then(function (response) {
              place._id = response.data._id;
              vm.places.push(place);
              vm.dirty = true;
            });
          }
        });
        $scope.$apply();
        input.focus();
        input.value = '';
      });
    }

    function saveItinerary() {
      vm.itinerary.places = $('.sortable-itinerary').sortable("toArray");
      ItineraryService.updateItinerary(vm.itinerary._id, vm.itinerary).then(function (response) {
        vm.itinerary = response.data;
        vm.dirty = false;
      });
    }


    function resetToLastSave() {
      ItineraryService.findItineraryById(vm.itinId).then(function (response) {
        var itinerary = response.data;
        vm.itinerary = itinerary;
        vm.places = itinerary.places;
        vm.dirty = false;
      });
    }


    function _formatPlacesToIds(places) {
      var placeIds = [];
      for (var i = 0; i < places.length; i++) {
        placeIds.push(places[i]._id);
      }
      return placeIds;
    }
  }
})();