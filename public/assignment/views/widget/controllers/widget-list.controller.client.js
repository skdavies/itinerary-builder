(function () {
  angular
    .module('WebAppMaker')
    .controller('WidgetListController', widgetListController);

  function widgetListController(WidgetService, PageService, $location, $routeParams, $sce) {
    var vm = this;
    vm.back = back;
    vm.addWidget = addWidget;
    vm.viewProfile = viewProfile;
    vm.editWidget = editWidget;
    vm.trustHtml = trustHtml;
    vm.trustUrl = trustUrl;
    vm.reorderWidget = reorderWidget;

    function init() {
      vm.userId = $routeParams['uid'];
      vm.websiteId = $routeParams['wid'];
      vm.pageId = $routeParams['pid'];
      PageService.findPageById(vm.pageId).then(function (response) {
        vm.widgets = response.data.widgets;
      }, function () {
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

    function reorderWidget(initial, final) {
      if (initial !== final) {
        return WidgetService.reorderWidget(vm.pageId, initial, final);
      }
    }
  }
})();