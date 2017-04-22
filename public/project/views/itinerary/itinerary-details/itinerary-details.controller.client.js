(function () {
  angular
    .module('ItineraryPlanner')
    .controller('ItineraryDetailsController', itineraryDetailsController);

  function itineraryDetailsController($location, $routeParams, ItineraryService, PlaceService, $scope, loggedIn,
                                      $route, UserService) {
    var vm = this;
    vm.saveItinerary = saveItinerary;
    vm.resetToLastSave = resetToLastSave;
    vm.followingYn = followingYn;
    vm.toggleFollow = toggleFollow;
    vm.clearName = clearName;

    function init() {
      vm.itinId = $routeParams['itinId'];
      vm.user = loggedIn;
      vm.places = [];
      vm.itinerary = {};

      if (vm.user && vm.user.role === 'ADMIN') {
        $location.url('/admin');
        return;
      } else if (vm.user && vm.user.role === 'ADVERTISER') {
        $location.url('/place');
        return;
      }

      ItineraryService.findItineraryById(vm.itinId).then(function (response) {
        vm.itinerary = response.data;
        vm.places = response.data.places;
        initMap();
      }, function () {
        $route.reload();
      });
      vm.dirty = false;
    }

    init();

    function initMap() {
      var fenway = { lat: 42.346268, lng: -71.095764 };
      var map = new google.maps.Map(document.getElementById('map-itin-details'), {
        zoom: 4,
        center: vm.places.length ? { lat: vm.places[0].lat, lng: vm.places[0].lng } : fenway
      });
      for (var i = 0; i < vm.places.length; i++) {
        new google.maps.Marker({
          position: {
            lat: vm.places[i].lat,
            lng: vm.places[i].lng
          },
          map: map
        });
      }
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
              googlePlaceId: place.place_id, name: place.name, lat: coordinates.lat, lng: coordinates.lng
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

    function followingYn(followId) {
      if (!vm.user || !vm.user.following.count) {
        return false;
      } else {
        var followingUsers = vm.user.following.users;
        if (typeof followingUsers[0] === 'string' || followingUsers[0] instanceof String) {
          return vm.user.following.users.includes(followId)
        } else {
          return vm.user.following.users.filter(function (u) {
              return u.followers.users.includes(followId)
            }).length === 0;
        }
      }
    }

    function toggleFollow(followId) {
      if (followingYn(followId)) {
        UserService.unfollowUser(vm.user._id, followId).then(function (response) {
          vm.user = response.data;
        });
      } else {
        UserService.followUser(vm.user._id, followId).then(function (response) {
          vm.user = response.data;
        });
      }
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

    function clearName() {
      if (vm.itinerary.name === 'Untitled Trip') {
        vm.itinerary.name = '';
      }
    }
  }
})();