module.exports = function (app, model) {

  var pageModel = model.pageModel;
  var websiteModel = model.websiteModel;

  app.post('/assignment/api/website/:websiteId/page', createPage);
  app.get('/assignment/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/assignment/api/page/:pageId', findPageById);
  app.put('/assignment/api/page/:pageId', updatePage);
  app.delete('/assignment/api/page/:pageId', deletePage);

  function createPage(req, res) {
    var page = req.body;
    if (page) {
      pageModel.createPage(req.params.websiteId, page).then(function (page) {
        websiteModel.findWebsiteById(req.params.websiteId).then(function (website) {
          website.pages.push(page._id);
          website.save();
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

  function findAllPagesForWebsite(req, res) {
    pageModel.findAllPagesForWebsite(req.params.websiteId).then(function(pages) {
      res.json(pages);
    }, function () {
      res.sendStatus(500);
    });
  }

  function findPageById(req, res) {
    pageModel.findPageById(req.params.pageId).then(function (page) {
      res.json(page);
    }, function () {
      res.status(404).send('Page with that ID does not exist.');
    });
  }

  function updatePage(req, res) {
    if (req.body) {
      pageModel.updatePage(req.params.pageId, req.body).then(function () {
        res.sendStatus(200);
      }, function () {
        res.status(404).send('Page does not exist.');
      });
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deletePage(req, res) {
    pageModel.deletePage(req.params.pageId).then(function (page) {
      var websiteId = page._website;
      websiteModel.findWebsiteById(websiteId).then(function (website) {
        var index = website.pages.indexOf(page._id);
        website.pages.splice(index, 1);
        website.save();
        res.sendStatus(200);
      }, function () {
        res.sendStatus(500);
      });
    }, function () {
      res.status(404).send('Page does not exist.');
    });
  }
};