module.exports = function () {

  var userModel = require('./user/user.model.server.js')();
  var websiteModel = require('./website/website.model.server.js')();
  var pageModel = require('./page/page.model.server.js')();
  var widgetModel = require('./widget/widget.model.server.js')();

  return {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
  };
};
