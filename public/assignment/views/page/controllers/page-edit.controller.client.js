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
      PageService.findPageById(vm.pageId).success(function (page) {
        vm.page = page;
      }).catch(function () {
        vm.error = 'Page could not be loaded.';
      });
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
      PageService.updatePage(vm.pageId, page).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Page could not be saved. Please try again.';
      });
    }

    function edit(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId);
    }

    function viewPageWidgets(pageId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + pageId + '/widget');
    }

    function deletePage() {
      PageService.deletePage(vm.pageId).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Page could not be deleted. Please try again.';
      });
    }
  }
})();