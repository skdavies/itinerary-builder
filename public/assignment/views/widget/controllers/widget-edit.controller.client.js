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
    vm.goBack = goBack;

    function init() {
      vm.new = $location.$$path.endsWith('/true');
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
      vm.widgetId = $routeParams['wgid'];
      WidgetService.findWidgetById(vm.widgetId).success(function (widget) {
        vm.widget = widget;
      }).catch(function () {
        vm.error = 'Unable to load widget. Please try again';
      });
    }

    init();

    function goBack() {
      if (vm.new) {
        deleteWidget();
      } else {
        back();
      }
    }

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
    }

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }
    
    function updateWidget() {
      WidgetService.updateWidget(vm.widgetId, vm.widget).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Unable to update widget. Please try again.';
      });
    }
    
    function deleteWidget() {
      WidgetService.deleteWidget(vm.widgetId).success(function () {
        back();
      }).catch(function () {
        vm.error = 'Could not delete widget. Please try again.';
      });
    }
  }
})();