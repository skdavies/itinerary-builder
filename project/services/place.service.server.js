module.exports = function (app, model) {

  var placeModel = model.placeModel;

  app.post('/project/api/places', createPlace);
  app.get('/project/api/places', findAllPlaces);
  app.get('/project/api/places/:placeId', findPlaceById);
  app.get('/project/api/places/google/:googleId', findPlaceByGoogleId);
  app.post('/project/api/places/:placeId/reviews', addPlaceReview);
  app.post('/project/api/places/:placeId/ads', addPlaceAd);
  app.get('/project/api/places/ads/recent', findMostRecentAds);
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

  function addPlaceAd(req, res) {
    var ad = req.body;
    if (ad && ad.text) {
      if (req.user && req.user.role === 'ADVERTISER') {
        placeModel.addPlaceAd(req.user._id, req.params.placeId, ad.text).then(function (place) {
          res.json(place);
        }, function (error) {
          res.sendStatus(500);
        });
      } else {
        res.status(401).send('Only local advertisers can do that.');
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

  function findMostRecentAds(req, res) {
    placeModel.findMostRecentAds().then(function (places) {
      res.json(places);
    }, function (err) {
      res.sendStatus(500);
    });
  }
};