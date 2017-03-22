module.exports = function (app, model) {

  var WebsiteModel = model.websiteModel;
  var UserModel = model.userModel;

  app.post('/assignment/api/user/:userId/website', createWebsite);
  app.get('/assignment/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/assignment/api/website/:websiteId', findWebsiteById);
  app.put('/assignment/api/website/:websiteId', updateWebsite);
  app.delete('/assignment/api/website/:websiteId', deleteWebsite);

  function createWebsite(req, res) {
    var website = req.body;
    if (website) {
      WebsiteModel.createWebsiteForUser(req.params.userId, website).then(function (site) {
        UserModel.findUserById(req.params.userId).then(function (user) {
          user.websites.push(site._id);
          user.save();
          res.sendStatus(200);
        }, function () {
          res.sendStatus(500);
        });
      }, function () {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function findAllWebsitesForUser(req, res) {
    WebsiteModel.findAllWebsitesForUser(req.params.userId).then(function(websites) {
      res.json(websites);
    }, function () {
      res.sendStatus(500);
    });
  }

  function findWebsiteById(req, res) {
    WebsiteModel.findWebsiteById(req.params.websiteId).then(function (website) {
      res.json(website);
    }, function () {
      res.status(404).send('Website with that ID does not exist.');
    });
  }

  function updateWebsite(req, res) {
    if (req.body) {
      WebsiteModel.updateWebsite(req.params.websiteId, req.body).then(function (obj) {
        console.log(obj);
        res.sendStatus(200);
      }, function () {
        res.status(404).send('Website does not exist.'); // only hit if a website isn't found
      });
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deleteWebsite(req, res) {
    WebsiteModel.deleteWebsite(req.params.websiteId).then(function (website) {
      var userId = website._user;
      UserModel.findUserById(userId).then(function (user) {
        var index = user.websites.indexOf(website.websiteId);
        user.websites.splice(index, 1);
        user.save();
        res.sendStatus(200);
      }, function () {
        res.sendStatus(500);
      });
    }, function () {
      res.status(404).send('Website does not exist.');
    });
  }
};