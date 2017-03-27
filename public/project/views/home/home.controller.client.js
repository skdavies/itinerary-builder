(function () {
  angular
    .module('ItineraryPlanner')
    .controller('HomeController', homeController);

  function homeController($location, $routeParams, UserService, $scope) {
    var vm = this;
    vm.login = login;
    vm.toggleLogin = toggleLogin;
    vm.toggleRegister = toggleRegister;
    vm.register = register;
    vm.saveItinerary = saveItinerary;
    vm.resetToLastSave = resetToLastSave;

    function init() {
      vm.userId = $routeParams['userId'];
      vm.itinId = $routeParams['itinId'];
      if (vm.userId && vm.itinId) {
        // TODO get places from itinerary service call
        // TODO get user
      } else {
        vm.places = [];
        vm.user = false;
      }
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
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (vm.places.length === 0) {
          var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
          new google.maps.Marker({
            position: coordinates,
            map: map
          });
          map.setCenter(coordinates)
        }
        vm.places.push(place);
        $scope.$apply();
      });
    }

    function login(user) {
      UserService.findUserByCredentials(user.username, user.password).then(function (user) {
        vm.toggleLogin();
        vm.user = user;
      });
    }

    function register(user) {
      var usr = {
        username: user.username,
        password: user.password
      };
      UserService.createUser(usr).then(function (user) {
        vm.toggleRegister();
        vm.user = user;
        if (vm.places.length > 0) {
          //TODO save itinerary
        }
      });
    }
    
    function saveItinerary() {

    }
    
    function resetToLastSave() {
      
    }

    function toggleRegister() {
      $('#registerModal').modal('toggle');
    }

    function toggleLogin() {
      $('#loginModal').modal('toggle');
    }
  }
})();