(function () {
  angular
    .module('WebAppMaker')
    .controller('LoginController', loginController);

  function loginController($location, UserService) {
    var vm = this;
    vm.login = login;
    vm.register = register;

    function init() {}
    init();

    function login(user) {
      if (user) {
        UserService.findUserByCredentials(user.username, user.password).then(function (response) {
          var user = response.data;
          if (!user) {
            vm.error = 'User not found. Please try again.'
          } else {
            $location.url('/user/' + user._id);
          }
        }, function () {
          vm.error = 'User not found. Please try again.'
        });
      }
    }

    function register() {
      $location.url('/register');
    }
  }
})();