module.exports = function (app) {
  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  app.post('/assignment/api/website/:websiteId/page', createPage);
  app.get('/assignment/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/assignment/api/page/:pageId', findPageById);
  app.put('/assignment/api/page/:pageId', updatePage);
  app.delete('/assignment/api/page/:pageId', deletePage);

  function createPage(req, res) {
    var page = req.body;
    if (page) {
      page._id = (parseInt(pages[pages.length - 1]._id) + 1).toString();
      page.websiteId = req.params.websiteId;
      pages.push(page);
      res.sendStatus(200);
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function findAllPagesForWebsite(req, res) {
    var websitePages = [];
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].websiteId === req.params.websiteId) {
        websitePages.push(pages[i]);
      }
    }
    res.json(websitePages);
  }

  function findPageById(req, res) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === req.params.pageId) {
        res.json(pages[i]);
        return;
      }
    }
    res.status(404).send('Page with that ID does not exist.');
  }

  function updatePage(req, res) {
    if (req.body) {
      for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id === req.params.pageId) {
          pages[i] = req.body;
          res.sendStatus(200);
          return;
        }
      }
      res.status(404).send('Page does not exist.');
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deletePage(req, res) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === req.params.pageId) {
        pages.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status(404).send('Page does not exist.');
  }
};