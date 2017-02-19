(function () {
  angular
    .module('WebAppMaker')
    .controller('ProfileController', profileController);

  function profileController(UserService, $location, $routeParams) {
    var vm = this;
    vm.viewWebsites = viewWebsites;
    vm.logout = logout;
    vm.updateUser = updateUser;

    function init() {
      vm.userId = $routeParams['uid'];
      UserService.findUserById(vm.userId).success(function (user) {
        vm.user = user;
      }).catch(function () {
        vm.error = 'User data could not be loaded';
      });
    }
    init();
    
    function viewWebsites() {
      $location.url('/user/' + vm.userId + '/website');
    }
    
    function updateUser(userId, user) {
      UserService.updateUser(userId, user).success(function () {
        vm.message = 'User updated successfully.';
      }).catch(function () {
        vm.error = 'User info could not be updated.';
      });
    }

    function logout() {
      $location.url('/login');
    }
  }
})();