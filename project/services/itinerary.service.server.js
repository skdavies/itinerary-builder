module.exports = function (app, model) {

  var userModel = model.userModel;
  var itineraryModel = model.itineraryModel;

  app.post('/project/api/users/:userId/itineraries', createItinerary);
  app.get('/project/api/users/:userId/itineraries', findItinerariesForUser);
  app.get('/project/api/itineraries/:itinId', findItineraryById);
  app.put('/project/api/itineraries/:itinId', updateItinerary);
  app.delete('/project/api/itineraries/:itinId', deleteItinerary);
  app.put('/project/api/itineraries/:itinId/places/reorder', reorderPlaces);

  function createItinerary(req, res) {
    var itinerary = req.body;
    if (itinerary) {
      itineraryModel.createItinerary(itinerary).then(function (itinerary) {
        userModel.findUserById(req.params.userId).then(function (user) {
          user.itineraries.push(user._id);
          user.save();
          res.json(itinerary);
        }, function (error) {
          res.sendStatus(500);
        });
      }, function (error) {
        res.status(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function findItinerariesForUser(req, res) {
    itineraryModel.findItinerariesForUser(req.params.userId).then(function (itineraries) {
      res.json(itineraries);
    }, function (error) {
      res.status(500);
    });
  }

  function findItineraryById(req, res) {
    itineraryModel.findItineraryById(req.params.itinId).then(function (itinerary) {
      if (itinerary) {
        res.json(itinerary);
      } else {
        res.status(404).send('Itinerary with that ID does not exist.');
      }
    }, function (error) {
      res.sendStatus(500);
    })
  }

  function updateItinerary(req, res) {
    if (req.body) {
      itineraryModel.updateItinerary(req.params.itinId, req.body).then(function (itinerary) {
        res.json(itinerary);
      }, function (error) {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function deleteItinerary(req, res) {
    itineraryModel.deleteItinerary(req.params.itinId).then(function (itinerary) {
      userModel.findUserById(itinerary._user).then(function (user) {
        var index = user.itineraries.indexOf(itinerary._id);
        user.itineraries.splice(index, 1);
        user.save();
        res.sendStatus(200);
      }, function (error) {
        res.sendStatus(500);
      });
    }, function (error) {
      res.sendStatus(500);
    })
  }

  function reorderPlaces(req, res) {
    var body = req.body;
    if (body && body.places && body.places.constructor === Array) {
      itineraryModel.reorderPlaces(req.params.itinId, req.body.places).then(function (itinerary) {
        res.json(itinerary);
      }, function (error) {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }
};