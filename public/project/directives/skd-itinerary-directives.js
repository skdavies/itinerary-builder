(function () {
  angular
    .module('skdItineraryDirectives', [])
    .directive('skdLoginNav', skdLoginNav);

  function skdLoginNav(UserService, $location) {

    function linkFunction(scope, element) {
      scope.toggleRegister = toggleRegister;
      scope.toggleLogin = toggleLogin;
      scope.login = login;
      scope.logout = logout;
      scope.register = register;
      scope.viewProfile = viewProfile;

      function toggleLogin() {
        $('#loginModal').modal('toggle');
      }

      function toggleRegister() {
        $('#registerModal').modal('toggle');
      }

      function login(user) {
        var usr = { username: user.username, password: user.password };
        UserService.login(usr).then(function (response) {
          var user = response.data;
          toggleLogin();
          $('.modal-backdrop').remove();
          if (user.role === 'ADMIN') {
            $location.url('/admin');
          } else if (user.role === 'ADVERTISER') {
            $location.url('/places');
          } else {
            scope.user = user;
          }
        });
      }

      function logout() {
        UserService.logout().then(function () {
          scope.user = null;
        });
      }

      function register(user) {
        var usr = {
          username: user.username,
          password: user.password
        };
        UserService.register(usr).then(function (response) {
          var user = response.data;
          toggleRegister();
          scope.user = user;
        });
      }

      function viewProfile() {
        // TODO go to profile
      }
    }

    return {
      templateUrl: 'directives/templates/skd-login-nav.html',
      link: linkFunction,
      scope: {
        user: '='
      }
    }
  }
})();