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
      WebsiteService.findWebsitesByUser(vm.userId).then(function (response) {
        vm.websites = response.data;
      }, function () {
        vm.error = 'Websites could not be loaded';
      });
    }
    init();

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function add() {
      $location.url('/user/' + vm.userId + '/website/new');
    }

    function edit(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId);
    }

    function viewWebsitePages(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId + '/page');
    }
  }
})();