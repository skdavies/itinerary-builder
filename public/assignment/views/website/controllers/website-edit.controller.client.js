(function () {
  angular
    .module('WebAppMaker')
    .controller('WebsiteEditController', websiteEditController);

  function websiteEditController($location, WebsiteService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.back = back;
    vm.save = save;
    vm.edit = edit;
    vm.deleteWebsite = deleteWebsite;
    vm.viewWebsitePages = viewWebsitePages;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
      vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website');
    }

    function save(website) {
      WebsiteService.updateWebsite(vm.websiteId, website);
      back();
    }

    function edit(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId);
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.websiteId);
      back();
    }

    function viewWebsitePages(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId + '/page');
    }
  }
})();