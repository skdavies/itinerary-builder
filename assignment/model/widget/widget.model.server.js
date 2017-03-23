module.exports = function () {

  var api = {
    createWidget: createWidget,
    findAllWidgetsForPage: findAllWidgetsForPage,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var WidgetSchema = require('./widget.schema.server')();
  var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

  return api;

  function createWidget(pageId, widget) {
    widget._page = pageId;
    return WidgetModel.create(widget);
  }

  function findAllWidgetsForPage(pageId) {
    return WidgetModel.find({ _page: pageId });
  }

  function findWidgetById(widgetId) {
    return WidgetModel.findById(widgetId);
  }

  function updateWidget(widgetId, widget) {
    return WidgetModel.findOneAndUpdate({ _id: widgetId }, { $set: widget });
  }

  function deleteWidget(widgetId) {
    return WidgetModel.findOneAndRemove({ _id: widgetId });
  }
};