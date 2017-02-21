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
      var widget = { 'widgetType': type };
      if (type === 'HEADER') {
        widget.size = 1;
        widget.text = '';
      } else if (type === 'YOUTUBE' || type === 'IMAGE') {
        widget.url = '';
        widget.width = '';
      }
      WidgetService.createWidget(vm.pageId, widget).success(function (widget) {
        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + widget._id);
      }).catch(function () {
        vm.error = 'Unable to create new widget. Please try again.';
      });
    }

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }
  }
})();