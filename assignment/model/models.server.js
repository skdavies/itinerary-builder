module.exports = function () {
  var mongoose = require('mongoose');
  var connectionString = 'mongodb://127.0.0.1:27017/skd_webdev';

  if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
      process.env.MLAB_PASSWORD + "@" +
      process.env.MLAB_HOST + ':' +
      process.env.MLAB_PORT + '/' +
      process.env.MLAB_APP_NAME;
  }

  mongoose.connect(connectionString);

  var userModel = require("./user/user.model.server.js")();
  var websiteModel = require("./website/website.model.server.js")();
  var pageModel = require("./page/page.model.server.js")();
  var widgetModel = require("./widget/widget.model.server.js")();

  var model = {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
  };

  return model;
};
