(function () {
  angular
    .module('WebAppMaker')
    .controller('WidgetEditController', widgetEditController);

  function widgetEditController(WidgetService, $location, $routeParams) {
    var vm = this;
    vm.back = back;
    vm.viewProfile = viewProfile;
    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
      vm.widgetId = $routeParams['wgid'];
      vm.widget = WidgetService.findWidgetById(vm.widgetId);
    }

    init();

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
    }

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }
    
    function updateWidget() {
      WidgetService.updateWidget(vm.widgetId, vm.widget);
      back();
    }
    
    function deleteWidget() {
      WidgetService.deleteWidget(vm.widgetId);
      back();
    }
  }
})();