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
        UserService.findUserByCredentials(user.username, user.password).success(function (usr) {
          $location.url('/user/' + usr._id);
        }).catch(function () {
          vm.error = 'User not found. Please try again.'
        });
      }
    }

    function register() {
      $location.url('/register');
    }
  }
})();