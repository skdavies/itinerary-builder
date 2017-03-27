(function () {
  angular
    .module('ItineraryPlanner')
    .controller('HomeController', homeController);

  function homeController($location, $routeParams, UserService) {
    var vm = this;
    vm.login = login;
    vm.toggleLogin = toggleLogin;
    vm.toggleRegister = toggleRegister;
    vm.register = register;

    function init() {
      vm.userId = $routeParams['userId'];
      vm.itinId = $routeParams['itinId'];
      if (vm.userId && vm.itinId) {

      }
      vm.places = [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' }
      ];
      vm.user = false;
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
        console.log(autocomplete.getPlace());
      });
      // new google.maps.Marker({
      //   position: fenway,
      //   map: map
      // });
    }

    function login(user) {
      UserService.findUserByCredentials(user.username, user.password).then(function (user) {
        vm.user = user;
      });
    }

    function register(user) {
      var usr = {
        username: user.username,
        password: user.password
      };
      UserService.createUser(usr).then(function (user) {
        vm.user = user;
        //TODO save itinerary
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