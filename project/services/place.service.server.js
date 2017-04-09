module.exports = function (app, model) {

  var placeModel = model.placeModel;

  app.post('/project/api/places', createPlace);
  app.get('/project/api/places', findAllPlaces);
  app.get('/project/api/places/:placeId', findPlaceById);
  app.get('/project/api/places/google/:googleId', findPlaceByGoogleId);
  app.post('/project/api/places/:placeId/reviews', addPlaceReview);
  app.post('/project/api/places/:placeId/ads', addPlaceAd);
  app.put('/project/api/places/:placeId', updatePlace);
  app.delete('/project/api/places/:placeId', deletePlace);

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
    if (review && review.reviewer && review.review) {
      placeModel.addPlaceReview(req.params.placeId, review).then(function (place) {
        res.json(place);
      }, function (error) {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function addPlaceAd(req, res) {
    var ad = req.body;
    if (ad && ad.advertiser && ad.ad) {
      placeModel.addPlaceReview(req.params.placeId, ad).then(function (place) {
        res.json(place);
      }, function (error) {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function updatePlace(req, res) {
    var place = req.body;
    if (place) {
      if (req.user.role === 'ADMIN') {
        placeModel.updatePlace(req.params.placeId, place).then(function () {
          res.sendStatus(200);
        }, function () {
          res.sendStatus(500);
        });
      } else {
        res.status(409).send('Yod do not have permission to do that.');
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
      res.status(409).send('Yod do not have permission to do that.');
    }
  }
};