(function () {
  angular
    .module('WebAppMaker')
    .controller('PageNewController', pageNewController);

  function pageNewController($location, PageService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.back = back;
    vm.save = save;
    vm.edit = edit;
    vm.viewPageWidgets = viewPageWidgets;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
        vm.pages = pages;
      }).catch(function () {
        vm.error = 'Pages could not be loaded.';
      });
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
    }

    function save(page) {
      PageService.createPage(vm.websiteId, page).success(function () {
        back();
      }).catch(function () {
        vm.error = 'New page could not be added. Please try again.';
      });
    }

    function edit(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId);
    }

    function viewPageWidgets(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId + '/widget');
    }
  }
})();