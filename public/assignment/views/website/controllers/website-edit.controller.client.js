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
      WebsiteService.findWebsiteById(vm.websiteId).success(function (website) {
        vm.website = website;
      }).catch(function () {
        vm.error = 'This website does not seem to exist.';
      });
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
      WebsiteService.updateWebsite(vm.websiteId, website).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Website could not be updated at this time. Please try again.';
      });
    }

    function edit(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId);
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.websiteId).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Oops, something went wrong.';
      });
    }

    function viewWebsitePages(websiteId) {
      $location.url('/user/' + vm.userId + '/website/' + websiteId + '/page');
    }
  }
})();