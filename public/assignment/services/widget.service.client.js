(function () {
  angular
    .module('WebAppMaker')
    .factory('WidgetService', widgetService);

  function widgetService($http) {

    return {
      'createWidget': createWidget,
      'findWidgetsByPageId': findWidgetsByPageId,
      'findWidgetById': findWidgetById,
      'updateWidget': updateWidget,
      'deleteWidget': deleteWidget,
      'reorderWidget': reorderWidget
    };

    function createWidget(pageId, widget) {
      return $http.post('/assignment/api/page/' + pageId + '/widget', widget);
    }

    function findWidgetsByPageId(pageId) {
      return $http.get('/assignment/api/page/' + pageId + '/widget');
    }

    function findWidgetById(widgetId) {
      return $http.get('/assignment/api/widget/' + widgetId);
    }

    function updateWidget(widgetId, widget) {
      return $http.put('/assignment/api/widget/' + widgetId, widget);
    }

    function deleteWidget(widgetId) {
      return $http.delete('/assignment/api/widget/' + widgetId);
    }

    function reorderWidget(pageId, initial, final) {
      return $http.put('/assignment/api/page/' + pageId + '/widget?initial=' + initial + '&final=' + final);
    }
  }

})();