(function () {
  angular
    .module('WebAppMaker')
    .factory('WidgetService', widgetService);

  function widgetService() {
    var widgets = [
      { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
      { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
      { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
      { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
      { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    return {
      'createWidget': createWidget,
      'findWidgetsByPageId': findWidgetsByPageId,
      'findWidgetById': findWidgetById,
      'updateWidget': updateWidget,
      'deleteWidget': deleteWidget
    };

    function createWidget(pageId, widget) {
      widget.pageId = pageId;
      return widgets.push(widget);
    }

    function findWidgetsByPageId(pageId) {
      var pageWidgets = [];
      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i].pageId === pageId) {
          return pageWidgets.push(widgets[i]);
        }
      }
      return pageWidgets;
    }

    function findWidgetById(widgetId) {
      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id === widgetId) {
          return widgets[i];
        }
      }
      return null;
    }

    function updateWidget(widgetId, widget) {
      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id === widgetId) {
          widgets[i] = widget;
        }
      }
    }

    function deleteWidget(widgetId) {
      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id === widgetId) {
          widgets.splice(i, 1);
        }
      }
    }
  }

})();