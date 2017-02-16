(function () {
  angular
    .module('WebAppMaker')
    .controller('PageEditController', pageEditController);

  function pageEditController($location, PageService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.back = back;
    vm.save = save;
    vm.edit = edit;
    vm.viewPageWidgets = viewPageWidgets;
    vm.deletePage = deletePage;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
      vm.page = angular.copy(PageService.findPageById(vm.pageId));
      vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
    }

    function save(page) {
      PageService.updatePage(vm.pageId, page);
      back();
    }

    function edit(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId);
    }

    function viewPageWidgets(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId + '/widget');
    }

    function deletePage() {
      PageService.deletePage(vm.pageId);
      back();
    }
  }
})();