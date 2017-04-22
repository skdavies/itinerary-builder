module.exports = function (app) {

  var request = require('request');

  var baseUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_SECRET + '/';

  app.get('/project/api/darksky/lookup', timeMachineLookup);

  function timeMachineLookup(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var time = req.query.time;
    if (lat && lon && time) {
      request(baseUrl + lat + ',' + lon + ',' + time, function (error, response, body) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.json(body);
        }
      });
    }
  }
};