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
          loggedIn: checkLoginUserRole
        }
      })
      .when('/itinerary/:itinId', {
        templateUrl: 'views/home/home.view.client.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          loggedIn: checkLoginUserRole
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
      .when('/place', {
        templateUrl: 'views/place/place.view.client.html',
        controller: 'PlaceController',
        controllerAs: 'vm',
        resolve: {
          loggedIn: checkLogin
        }
      })
      .when('/place/:placeId', {
        templateUrl: 'views/place/place.view.client.html',
        controller: 'PlaceController',
        controllerAs: 'vm',
        resolve: {
          loggedIn: checkLogin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  function checkLoginUserRole($q, UserService, $location) {
    var deferred = $q.defer();
    UserService.loggedin().then(function (response) {
      var user = response.data;
      if (!user) {
        deferred.resolve(null);
      } else if (user.role === 'USER') {
        deferred.resolve(user);
      } else if (user.role === 'ADVERTISER') {
        $location.url('/pages');
        deferred.reject();
      } else if (user.role === 'ADMIN') {
        $location.url('/admin');
        deferred.reject();
      }
    }, function () {
      deferred.resolve(null);
    });
    return deferred.promise;
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