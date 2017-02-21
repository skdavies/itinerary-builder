(function () {
  angular
    .module('WebAppMaker')
    .controller('WidgetListController', widgetListController);

  function widgetListController(WidgetService, $location, $routeParams, $sce) {
    var vm = this;
    vm.back = back;
    vm.addWidget = addWidget;
    vm.viewProfile = viewProfile;
    vm.editWidget = editWidget;
    vm.trustHtml = trustHtml;
    vm.trustUrl = trustUrl;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
      WidgetService.findWidgetsByPageId(vm.pageId).success(function (widgets) {
        vm.widgets = widgets;
      }).catch(function () {
        vm.error = 'Unable to load widgets.';
      });
    }
    init();

    function back() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
    }

    function addWidget() {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/new');
    }

    function viewProfile() {
      $location.url('user/' + vm.userId);
    }

    function editWidget(widgetId) {
      $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + widgetId);
    }

    function trustHtml(html) {
      return $sce.trustAsHtml(html);
    }

    function trustUrl(url) {
      var formatted = url.split('/')[3];
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + formatted);
    }
  }
})();