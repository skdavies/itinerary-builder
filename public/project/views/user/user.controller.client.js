(function () {
  angular
    .module('ItineraryPlanner')
    .controller('UserController', userController);

  function userController($location, $routeParams, PlaceService, loggedIn, $mdDialog) {
    var vm = this;

    function init() {

    }

    init();

  }
})();