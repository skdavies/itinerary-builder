(function() {
  angular
    .module('ItineraryPlanner')
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.view.client.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/user/:userId/itinerary/:itinId', {
        templateUrl: 'views/home/home.view.client.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }
})();