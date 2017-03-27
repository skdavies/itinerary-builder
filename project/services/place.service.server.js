module.exports = function (app, model) {

  var placeModel = model.placeModel;

  app.post('/project/api/places', createPlace);
  app.get('/project/api/places/:placeId', findPlaceById);
  app.get('/project/api/places/google/:googleId', findPlaceByGoogleId);
  app.post('/project/api/places/reviews', addPlaceReview);
  app.post('/project/api/places/reviews', addPlaceAd);
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
      placeModel.updatePlace(req.params.placeId, place).then(function () {
        res.sendStatus(200);
      }, function () {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function deletePlace(req, res) {
    placeModel.deletePlace(req.params.placeId).then(function () {
      res.sendStatus(200);
    }, function (error) {
      res.sendStatus(500);
    });
  }
};