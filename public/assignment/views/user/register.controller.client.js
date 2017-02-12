(function () {
  angular
    .module('WebAppMaker')
    .controller('RegisterController', registerController);

  function registerController($location, UserService) {
    var vm = this;
    vm.register = register;
    vm.cancel = cancel;

    function init() {}
    init();

    function register(user) {
      if (user) {
        var usr = UserService.findUserByUsername(user.username);
        if (usr) {
          vm.error = 'A user with that name already exists.';
        } else {
          if (user.password === user.verify) {
            UserService.createUser(user);
            $location.url('/user/' + UserService.findUserByUsername(user.username)._id);
          } else {
            vm.error = 'Passwords must match.';
          }
        }
      }
    }

    function cancel() {
      $location.url('/login');
    }
  }
})();
