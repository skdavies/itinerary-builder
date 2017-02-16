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
      WebsiteService.createWebsite(vm.userId, website);
      back();
    }

    function edit(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId);
    }

    function viewWebsitePages(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId + '/page');
    }
  }
})();