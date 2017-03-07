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
          UserService.createUser(usr).then(function (response) {
            var userId = response.data._id;
            if (userId) {
              $location.url('/user/' + userId);
            } else {
              vm.error = 'Oops something went wrong.';
            }
          }, function (error) {
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
