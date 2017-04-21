(function () {
  angular
    .module('skdItineraryDirectives', [])
    .directive('skdLoginNav', skdLoginNav)
    .directive('skdBottomNav', skdBottomNav)
    .directive('skdSortableItinerary', skdSortableItinerary);

  function skdSortableItinerary($location, $mdDialog) {
    function link(scope) {
      scope.viewPlace = viewPlace;
      scope.removePlace = removePlace;
      initSortable();

      function initSortable() {
        var startIndex = -1;

        function onStart(event, ui) {
          startIndex = ui.item.index();
        }

        function onStop(event, ui) {
          var finalIndex = ui.item.index();
          if (finalIndex !== startIndex) {
            scope.places.splice(finalIndex, 0, scope.places.splice(startIndex, 1)[0]);
            scope.dirty = true;
            scope.$apply();
          }
        }

        $(".sortable-itinerary").sortable({
          axis: 'y',
          handle: '.sortable',
          start: onStart,
          stop: onStop
        });
      }

      function removePlace(index) {
        scope.places.splice(index, 1);
        scope.dirty = true;
      }

      function viewPlace(place, event) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .textContent('Any unsaved changes to your itinerary will be lost when you leave the page.')
          .targetEvent(event)
          .ok('Yes, I\'m sure')
          .cancel('Never Mind');

        $mdDialog.show(confirm).then(function () {
          $location.url('/place/' + place._id);
        });
      }
    }

    return {
      templateUrl: 'directives/templates/skd-sortable-itinerary.html',
      link: link,
      scope: {
        places: '=',
        dirty: '='
      }
    }
  }

  function skdLoginNav(UserService, $location, $mdDialog) {

    function linkFunction(scope, element) {
      // var vm = scope;
      scope.toggleRegister = toggleRegister;
      scope.toggleLogin = toggleLogin;
      scope.logout = logout;
      scope.viewProfile = viewProfile;
      // console.log(vm);

      if (scope.control) {
        scope.control = {
          showRegister: toggleRegister,
          showLogin: toggleLogin
        }
      }

      function toggleLogin(ev) {
        $mdDialog.show({
          controller: LoginModalController,
          templateUrl: '/project/directives/templates/modals/skd-login-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        }).then(function (response) {
          if (response === 'REGISTER') {
            toggleRegister(ev);
          } else {
            scope.user = response;
          }
        }, function () {
          scope.user = null;
        });
      }

      function toggleRegister(ev) {
        $mdDialog.show({
          controller: RegisterModalController,
          templateUrl: '/project/directives/templates/modals/skd-register-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        }).then(function (response) {
          if (response === 'LOGIN') {
            toggleLogin(ev);
          } else {
            scope.user = response;
          }
        }, function () {
          scope.user = null;
        });
      }

      function logout() {
        UserService.logout().then(function () {
          scope.user = null;
          $location.url('/');
        });
      }

      function viewProfile() {
        $location.url('/user/' + scope.user._id);
      }

      function LoginModalController($scope, $mdDialog) {
        $scope.cancel = cancel;
        $scope.showRegister = showRegister;
        $scope.login = login;

        function showRegister() {
          $mdDialog.hide('REGISTER');
        }

        function cancel() {
          $mdDialog.cancel();
        }

        function login(user) {
          UserService.login(user).then(function (response) {
            var user = response.data;
            $mdDialog.hide(user);
            if (user.role === 'ADMIN') {
              $location.url('/admin');
            } else if (user.role === 'ADVERTISER') {
              $location.url('/place');
            }
          });
        }
      }

      function RegisterModalController($scope, $mdDialog) {
        $scope.cancel = cancel;
        $scope.showLogin = showLogin;
        $scope.register = register;

        function showLogin() {
          $mdDialog.hide('LOGIN');
        }

        function cancel() {
          $mdDialog.cancel();
        }

        function register(user) {
          if (user.password === user.confirm) {
            var role = user.advertiser ? 'ADVERTISER' : 'USER';
            var usr = { username: user.username, password: user.password, role: role };
            UserService.register(usr).then(function (response) {
              var user = response.data;
              $mdDialog.hide(user);
              if (user.role === 'ADMIN') {
                $location.url('/admin');
              } else if (user.role === 'ADVERTISER') {
                $location.url('/place');
              }
            });
          }
        }
      }
    }

    return {
      templateUrl: 'directives/templates/skd-login-nav.html',
      link: linkFunction,
      scope: {
        user: '=',
        control: '='
      }
    }
  }

  function skdBottomNav($location) {
    function link(scope, element) {
      scope.goPlaces = goPlaces;
      scope.goHome = goHome;
      scope.goItineraries = goItineraries;
      scope.goUsers = goUsers;

      function goPlaces() {
        $location.url('/place');
      }

      function goHome() {
        $location.url('/');
      }

      function goItineraries() {
        $location.url('/itinerary');
      }

      function goUsers() {
        $location.url('/user');
      }
    }

    return {
      templateUrl: 'directives/templates/skd-bottom-nav.html',
      link: link
    }
  }
})();