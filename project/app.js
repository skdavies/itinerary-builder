module.exports = function(app) {
  var model = require('./model/models.server.js')();
  require('./services/user.service.server')(app, model);
  require('./services/place.service.server')(app, model);
  require('./services/itinerary.service.server')(app, model);
  require('./services/dark-sky-service.server')(app);
};