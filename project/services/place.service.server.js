module.exports = function (app, model) {

  var placeModel = model.placeModel;

  app.post('/api/places', createPlace);
  app.get('/api/places', findAllPlaces);
  app.get('/api/places/:placeId', findPlaceById);
  app.get('/api/places/google/:googleId', findPlaceByGoogleId);
  app.post('/api/places/:placeId/reviews', addPlaceReview);
  app.put('/api/places/:placeId', updatePlace);
  app.delete('/api/places/:placeId', deletePlace);

  function createPlace(req, res) {
    var place = req.body;
    if (place) {
      placeModel.createPlace(place).then(function (place) {
        res.json(place);
      }, function (error) {
        res.status(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function findAllPlaces(req, res) {
    placeModel.findAllPlaces().then(function (places) {
      res.json(places);
    }, function (err) {
      res.sendStatus(500);
    });
  }

  function findPlaceById(req, res) {
    placeModel.findPlaceById(req.params.placeId).then(function (place) {
      res.json(place);
    }, function (error) {
      res.sendStatus(500);
    });
  }

  function findPlaceByGoogleId(req, res) {
    placeModel.findPlaceByGoogleId(req.params.googleId).then(function (place) {
      res.json(place);
    }, function (error) {
      res.sendStatus(500);
    });
  }

  function addPlaceReview(req, res) {
    var review = req.body;
    if (review && review.text) {
      if (req.user && req.user.role === 'USER') {
        placeModel.addPlaceReview(req.user._id, req.params.placeId, review.text).then(function (place) {
          res.json(place);
        }, function (error) {
          res.sendStatus(500);
        });
      } else {
        res.status(401).send('Only users can add reviews.');
      }
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function updatePlace(req, res) {
    var place = req.body;
    if (place) {
      if (req.user.role === 'ADMIN') {
        placeModel.updatePlace(req.params.placeId, place).then(function (place) {
          res.json(place);
        }, function (err) {
          res.sendStatus(500);
        });
      } else {
        res.status(401).send('Yod do not have permission to do that.');
      }
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function deletePlace(req, res) {
    if (req.user.role === 'ADMIN') {
      placeModel.deletePlace(req.params.placeId).then(function () {
        res.sendStatus(200);
      }, function (error) {
        res.sendStatus(500);
      });
    } else {
      res.status(401).send('Yod do not have permission to do that.');
    }
  }
};