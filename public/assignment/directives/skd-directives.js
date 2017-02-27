(function () {
  angular
    .module('skdDirectives', [])
    .directive('skdSortableWidgets', skdSortableWidgets);

  function skdSortableWidgets() {

    function linkFunction(scope, element) {
      var startIndex = -1;

      function onStart(event, ui) {
        startIndex = ui.item.index();
      }

      function onStop(event, ui) {
        var finalIndex = ui.item.index();
        var promise = scope.vm.reorderWidget(startIndex, finalIndex);
        if (promise) {
          promise.then(function(){}, function () {
            $('#widget-list').sortable('cancel');
          });
        }

      }

      $('#widget-list').sortable({
        axis: 'y',
        handle: '.sortable',
        start: onStart,
        stop: onStop
      });
    }

    return {
      templateUrl: 'directives/templates/skd-sortable-widgets.html',
      link: linkFunction
    }
  }
})();