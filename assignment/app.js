module.exports = function(app) {
  var model = require("./model/models.server.js")();
  require('./services/user.service.server.js')(app, model.userModel);
  require('./services/website.service.server.js')(app, model.websiteModel);
  require("./services/page.service.server.js")(app, model.pageModel);
  require("./services/widget.service.server.js")(app, model.widgetModel);
};