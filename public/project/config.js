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
      .when('/admin', {
        templateUrl: 'views/admin/admin.view.client.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          admin: checkAdmin
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

  function checkAdmin($q, UserService, $location) {
    var deferred = $q.defer();
    UserService.isAdmin().then(function (response) {
      var user = response.data;
      if (user && user.role === 'ADMIN') {
        deferred.resolve(user);
      } else {
        $location.url('/');
        deferred.reject();
      }
    }, function () {
      deferred.reject();
    });
    return deferred.promise;
  }

})();