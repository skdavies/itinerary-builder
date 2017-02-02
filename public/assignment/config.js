(function() {
  angular
    .module('WebAppMaker')
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/user/login.view.client.html'
      })
      .when('/register', {
        templateUrl: 'views/user/register.view.client.html'
      })
      .when('/profile', {
        templateUrl: 'views/user/profile.view.client.html'
      });
  }
})();