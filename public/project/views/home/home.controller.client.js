(function () {
  angular
    .module('ItineraryPlanner')
    .controller('HomeController', homeController);

  function homeController($location, $routeParams, ItineraryService, PlaceService, UserService, $scope) {
    var vm = this;
    vm.login = login;
    vm.toggleLogin = toggleLogin;
    vm.toggleRegister = toggleRegister;
    vm.register = register;
    vm.saveItinerary = saveItinerary;
    vm.resetToLastSave = resetToLastSave;
    vm.removePlace = removePlace;

    function init() {
      vm.userId = $routeParams['userId'];
      vm.itinId = $routeParams['itinId'];
      if (vm.userId && vm.itinId) {
        ItineraryService.findItineraryById(vm.itinId).then(function (response) {
          vm.itinerary = response.data;
        });
        // if user id matches the logged in user then they can edit
        // TODO get places from itinerary service call
        // TODO get user
      } else {
        vm.itinerary = null;
        vm.places = [];
        vm.placeIds = [];
        vm.user = false;
      }
      vm.dirty = false;
      initMap()
    }

    init();

    function initMap() {
      var fenway = { lat: 42.346268, lng: -71.095764 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: fenway
      });
      var options = {};
      var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (vm.places.length === 0) {
          var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          new google.maps.Marker({
            position: coordinates,
            map: map
          });
          map.setCenter(coordinates)
        }
        var added = false;
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          if (response.data) { //that place already exists
            var placeId = response.data._id;
            if (vm.placeIds.indexOf(placeId) === -1) {
              vm.placeIds.push(placeId);
            } else {
              added = true;
            }
          } else {
            PlaceService.createPlace({ googlePlaceId: place.place_id, name: place.name }).then(function (response) {
              vm.placeIds.push(response.data._id);
            });
          }
          if (!added) {
            vm.dirty = true;
            vm.places.push(place);
          }
        });
        $scope.$apply();
        input.focus();
        input.value = '';
      });
    }

    function login(user) {
      UserService.findUserByCredentials(user.username, user.password).then(function (response) {
        vm.toggleLogin();
        vm.user = response.data;
      });
    }

    function register(user) {
      var usr = {
        username: user.username,
        password: user.password
      };
      UserService.createUser(usr).then(function (response) {
        var user = response.data;
        vm.toggleRegister();
        vm.user = user;
        if (vm.places.length > 0) {
          var itinerary = { _user: user._id, places: vm.placeIds };
          ItineraryService.createItinerary(user._id, itinerary).then(function (response) {
            vm.dirty = false;
            vm.itinerary = response.data;
          });
        }
      });
    }

    function saveItinerary() {
      if (vm.itinerary) {
        vm.itinerary.places = vm.placeIds;
        ItineraryService.updateItinerary(vm.itinerary.itineraryId, vm.itinerary).then(function (itinerary) {
        });
      } else {
        ItineraryService.createItinerary(vm.user._id, { places: vm.placeIds }).then(function (itinerary) {
        });
      }
      vm.dirty = false;
    }

    function removePlace(index) {
      vm.places = vm.places.slice(index, 1);
      vm.placeIds = vm.placeIds.slice(index, 1);
    }

    function resetToLastSave() {
      ItineraryService.findItineraryById(vm.itinId).then(function (itinerary) {
        vm.itinerary = itinerary;
        vm.places = itinerary.places;
      });
    }

    function toggleRegister() {
      $('#registerModal').modal('toggle');
    }

    function toggleLogin() {
      $('#loginModal').modal('toggle');
    }
  }
})();