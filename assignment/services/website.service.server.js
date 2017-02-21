module.exports = function (app) {
  var websites = [
    { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
  ];

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  function createWebsite(req, res) {
    var website = req.body;
    if (website) {
      website._id = (parseInt(websites[websites.length - 1]._id) + 1).toString();
      website.developerId = req.params.userId;
      websites.push(website);
      res.sendStatus(200);
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function findAllWebsitesForUser(req, res) {
    var userWebsites = [];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === req.params.userId) {
        userWebsites.push(websites[i]);
      }
    }
    res.json(userWebsites);
  }

  function findWebsiteById(req, res) {
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === req.params.websiteId) {
        res.json(websites[i]);
        return;
      }
    }
    res.status(404).send('Website with that ID does not exist.');
  }

  function updateWebsite(req, res) {
    if (req.body) {
      for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id === req.params.websiteId) {
          websites[i] = req.body;
          res.sendStatus(200);
          return;
        }
      }
      res.status(404).send('Website does not exist.'); // only hit if a website isn't found
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deleteWebsite(req, res) {
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === req.params.websiteId) {
        websites.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status(404).send('Website does not exist.'); // only hit if a matching website id isn't found
  }
};