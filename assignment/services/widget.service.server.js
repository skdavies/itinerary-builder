module.exports = function (app, model) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname + '/../../public/uploads' });

  var widgetModel = model.widgetModel;
  var pageModel = model.pageModel;

  app.post('/assignment/api/page/:pageId/widget', createWidget);
  app.get('/assignment/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/assignment/api/widget/:widgetId', findWidgetById);
  app.put('/assignment/api/widget/:widgetId', updateWidget);
  app.delete('/assignment/api/widget/:widgetId', deleteWidget);
  app.put('/assignment/api/page/:pageId/widget', reorderWidget);
  app.post('/assignment/api/upload', upload.single('myFile'), uploadImage);

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var location = req.body.location;
    var myFile = req.file;

    if (myFile) {
      var filename = myFile.filename;     // new file name in upload folder
      var url = '/uploads/' + filename;

      widgetModel.updateWidget(widgetId, { url: url }).then(function () {
        res.redirect('/assignment/#' + location);
      }, function () {
        res.sendStatus(500);
      });
    }
  }

  function createWidget(req, res) {
    var widget = req.body;
    if (widget) {
      widgetModel.createWidget(req.params.pageId, widget).then(function (widget) {
        pageModel.findPageById(req.params.pageId).then(function (page) {
          page.widgets.push(widget._id);
          page.save();
          res.json(widget);
        }, function (err) {
          res.sendStatus(500);
        });
      }, function (err) {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function findAllWidgetsForPage(req, res) {
    widgetModel.findAllWidgetsForPage(req.params.pageId).then(function (widgets) {
      res.json(widgets);
    }, function () {
      res.sendStatus(500);
    });
  }

  function findWidgetById(req, res) {
    widgetModel.findWidgetById(req.params.widgetId).then(function (widget) {
      res.json(widget);
    }, function () {
      res.status(404).send('Widget with that ID does not exist.');
    });
  }

  function updateWidget(req, res) {
    if (req.body) {
      widgetModel.updateWidget(req.params.widgetId, req.body).then(function (widget) {
        res.sendStatus(200);
      }, function () {
        res.status(404).send('Widget does not exist.');
      });
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deleteWidget(req, res) {
    widgetModel.deleteWidget(req.params.widgetId).then(function (widget) {
      // var pageId = widget._page;
      // pageModel.findPageById(pageId).then(function (page) {
      //   // page.save();
      //   res.sendStatus(200);
      // }, function () {
      //   res.sendStatus(500);
      // });
      // this works with this part commented out... not sure why, maybe because I used populate()?
      res.sendStatus(200);
    }, function () {
      res.status(404).send('Widget does not exist.');
    });
  }

  function reorderWidget(req, res) {
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);
    if (!isNaN(initial) && !isNaN(final)) {
      pageModel.reorderWidgets(req.params.pageId, initial, final).then(function () {
        res.sendStatus(200);
      }, function () {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Initial and final indices must be provided');
    }
  }
};