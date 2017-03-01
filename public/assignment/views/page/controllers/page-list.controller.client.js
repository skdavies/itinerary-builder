(function () {
  angular
    .module('WebAppMaker')
    .controller('PageListController', pageListController);

  function pageListController($location, PageService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.add = add;
    vm.edit = edit;
    vm.viewPageWidgets = viewPageWidgets;
    vm.back = back;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      PageService.findPagesByWebsiteId(vm.websiteId).then(function (response) {
        vm.pages = response.data;
      }, function () {
        vm.error = 'Pages could not be loaded. Please try again.';
      });
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function add() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/new');
    }

    function edit(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId);
    }

    function viewPageWidgets(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId + '/widget');
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website');
    }
  }
})();