(function () {
  angular
    .module('ItineraryPlanner')
    .controller('ProfileController', profileController);

  function profileController($location, $routeParams, UserService, loggedIn, $mdDialog, ItineraryService) {
    var vm = this;

    function init() {
      var userId = $routeParams['userId'];
      vm.user = loggedIn;

      UserService.findUserById(userId).then(function (response) {
        var user = response.data;
        if (vm.user._id === user._id) {
          vm.canEdit = true;
        }
      });

      ItineraryService.findItinerariesForUser(userId).then(function (response) {
        vm.itineraries = response.data;
      });
    }

    init();

  }
})();