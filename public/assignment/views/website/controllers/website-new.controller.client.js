(function () {
  angular
    .module('WebAppMaker')
    .controller('WebsiteNewController', websiteNewController);

  function websiteNewController($location, WebsiteService, $routeParams) {
    var vm = this;
    vm.viewProfile = viewProfile;
    vm.back = back;
    vm.save = save;
    vm.edit = edit;
    vm.viewWebsitePages = viewWebsitePages;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
        vm.websites = websites;
      });
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website');
    }

    function save(website) {
      WebsiteService.createWebsite(vm.userId, website).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Website could not be updated at this time. Please try again.';
      });
    }

    function edit(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId);
    }

    function viewWebsitePages(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId + '/page');
    }
  }
})();