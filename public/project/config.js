(function () {
  angular
    .module('ItineraryPlanner')
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.view.client.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          loggedIn: checkLogin
        }
      })
      .when('/itinerary/:itinId', {
        templateUrl: 'views/home/home.view.client.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          loggedIn: checkLogin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  function checkLogin($q, UserService) {
    var deferred = $q.defer();
    UserService.loggedin().then(function (response) {
      var user = response.data;
      deferred.resolve(user);
    }, function () {
      deferred.resolve(null);
    });
    return deferred.promise;
  }
})();