(function () {
  angular
    .module('ItineraryPlanner')
    .controller('AdminController', adminController);

  function adminController(admin, UserService, $location) {
    var vm = this;
    vm.logout = logout;

    function init() {
      if (!admin || admin.role !== 'ADMIN') {
        $location.url('/');
      }
      UserService.findAllUsers().then(function (response) {
        vm.users = response.data;
      });
    }

    init();

    function logout() {
      UserService.logout().then(function () {
        $location.url('/');
      });
    }

  }
})();