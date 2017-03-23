(function () {
  angular
    .module('WebAppMaker')
    .controller('WidgetNewController', widgetNewController);

  function widgetNewController(WidgetService, $location, $routeParams) {
    var vm = this;
    vm.back = back;
    vm.viewProfile = viewProfile;
    vm.createWidget = createWidget;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
    }

    init();

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
    }

    function createWidget(type) {
      var widget = { 'type': type };
      WidgetService.createWidget(vm.pageId, widget).then(function (response) {
        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' +
          response.data._id + '/true');
      }, function () {
        vm.error = 'Unable to create new widget. Please try again.';
      });
    }

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }
  }
})();