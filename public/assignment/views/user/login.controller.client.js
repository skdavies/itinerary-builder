(function () {
  angular
    .module('WebAppMaker')
    .controller('LoginController', loginController);

  function loginController($location, UserService) {
    var vm = this;
    vm.login = login;
    vm.register = register;
    vm.clearError = clearError;

    function init() {}
    init();

    function login(user) {
      if (user) {
        var usr = UserService.findUserByCredentials(user.username, user.password);
        if (usr) {
          $location.url('/user/' + usr._id);
        } else {
          vm.error = 'User not found. Please try again.'
        }
      }
    }

    function register() {
      $location.url('/register');
    }

    function clearError() {
      vm.error = null;
    }
  }
})();