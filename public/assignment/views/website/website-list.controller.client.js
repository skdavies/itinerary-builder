(function () {
  angular
    .module('WebAppMaker')
    .controller('WebsiteListController', websiteListController);

  function websiteListController($location, WebsiteService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.add = add;
    vm.edit = edit;
    vm.viewWebsitePages = viewWebsitePages;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function add() {
      $location.url('/user/' + vm.userId + '/website/new');
    }

    function edit(websiteId, website) {

    }

    function viewWebsitePages(websiteId) {

    }
  }
})();