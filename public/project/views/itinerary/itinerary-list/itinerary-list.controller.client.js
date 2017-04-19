(function () {
  angular
    .module('ItineraryPlanner')
    .controller('ItineraryListController', itineraryListController);

  function itineraryListController($location, ItineraryService, loggedIn, UserService) {
    var vm = this;
    vm.viewItinerary = viewItinerary;

    function init() {
      vm.user = loggedIn;
      if (vm.user && vm.user.role === 'ADMIN') {
        $location.url('/admin');
        return;
      } else if (vm.user && vm.user.role === 'ADVERTISER') {
        $location.url('/place');
        return;
      }
      vm.userItineraries = [];
      vm.followingItineraries = [];
      vm.trending = [];
      if (vm.user) {
        ItineraryService.findItinerariesForUser(vm.user._id).then(function (response) {
          vm.userItineraries = response.data;
        });
        // UserService.findFollowingItineraries(vm.user._id).then(function (response) {
        //   vm.followingItineraries = response.data;
        // });
      }
      UserService.findTrendingUsers().then(function (response) {
        var users = response.data;
        for (var i = 0; i < users.length; i++) {
          if (users[i].itineraries[0]) {
            vm.trending.push({ itinerary: users[i].itineraries[0], username: users[i].username });
          }
        }
      }, function (err) {
        console.log(err);
      });
    }

    init();

    function viewItinerary(itineraryId) {
      $location.url('/itinerary/' + itineraryId);
    }

  }
})();