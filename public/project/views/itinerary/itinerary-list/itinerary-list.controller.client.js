(function () {
  angular
    .module('ItineraryPlanner')
    .controller('ItineraryListController', itineraryListController);

  function itineraryListController($location, ItineraryService, loggedIn, UserService, $scope) {
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
        initUserData();
      }
      UserService.findTrendingUsers().then(function (response) {
        var users = response.data;
        for (var i = 0; i < users.length; i++) {
          if (users[i].itineraries[0]) {
            vm.trending.push({ itinerary: users[i].itineraries[0], username: users[i].username });
          }
        }
      });
      $scope.$watch('vm.user', function(newVal, oldVal) {
        if (newVal && !oldVal) {
          initUserData();
        }
      }, true);
    }

    init();

    function initUserData() {
      ItineraryService.findItinerariesForUser(vm.user._id).then(function (response) {
        vm.userItineraries = response.data;
      });
      vm.followingItineraries = [];
      UserService.findFollowingItineraries(vm.user._id).then(function (response) {
        var following = response.data.following.users;
        if (following.length) {
          for (var i = 0; i < following.length; i++) {
            var follow = following[i];
            if (follow.itineraries.length) {
              for (var j = 0; j < follow.itineraries.length; j++) {
                vm.followingItineraries.push({username: follow.username, itinerary: follow.itineraries[j]});
              }
            }
          }
          vm.followingItineraries.sort(compare);

          // TODO CHECK THIS WORKS WITH MORE ITINERARIES AND FOLLOWING
          function compare(a, b) {
            if (a.itinerary.dateCreated.getTime() > b.itinerary.dateCreated.getTime()) {
              return 1;
            } else if (a.itinerary.dateCreated.getTime() < b.itinerary.dateCreated.getTime()){
              return -1;
            } else {
              return 0;
            }
          }
        }
      });
    }

    function viewItinerary(itineraryId) {
      $location.url('/itinerary/' + itineraryId);
    }

  }
})();