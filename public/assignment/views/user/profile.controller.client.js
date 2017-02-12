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
      vm.user = UserService.findUserById(vm.userId);
    }
    init();
    
    function viewWebsites() {
      $location.url('/user/' + vm.userId + '/website');
    }
    
    function updateUser(userId, user) {
      UserService.updateUser(userId, user);
      console.log('hit');
    }

    function logout() {
      $location.url('/login');
    }
  }
})();