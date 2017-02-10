(function () {
  angular
    .module('WebAppMaker')
    .controller('LoginController', loginController);

  function loginController() {
    var vm = this;
    vm.login = login;

    function init() {

    }
    init();

    function login(user) {
      console.log('hit');
    }
  }
})();