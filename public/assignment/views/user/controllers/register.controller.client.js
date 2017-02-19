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
        if (user.password === user.verify) {
          var usr = {
            username: user.username,
            password: user.password
          };
          UserService.createUser(usr).success(function (user) {
            var userId = user._id;
            $location.url('/user/' + userId);
          }).catch(function (error) {
            vm.error = error.data;
          });
        } else {
          vm.error = 'Passwords must match.';
        }
      }
    }

    function cancel() {
      $location.url('/login');
    }
  }
})();
