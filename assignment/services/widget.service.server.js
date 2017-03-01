module.exports = function (app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname + '/../../public/uploads' });

  var widgets = [
    { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
  ];

  app.post('/assignment/api/page/:pageId/widget', createWidget);
  app.get('/assignment/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/assignment/api/widget/:widgetId', findWidgetById);
  app.put('/assignment/api/widget/:widgetId', updateWidget);
  app.delete('/assignment/api/widget/:widgetId', deleteWidget);
  app.put('/assignment/api/page/:pageId/widget', reorderWidget);
  app.post ('/assignment/api/upload', upload.single('myFile'), uploadImage);

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var location = req.body.location;
    var myFile = req.file;

    if (myFile) {
      var filename      = myFile.filename;     // new file name in upload folder
      var url = '/uploads/' + filename;

      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id === widgetId) {
          widgets[i].url = url;
          break;
        }
      }
    }

    res.redirect('/assignment/#' + location);
  }

  function createWidget(req, res) {
    var widget = req.body;
    if (widget) {
      widget._id = (parseInt(widgets[widgets.length - 1]._id) + 1).toString();
      widget.pageId = req.params.pageId;
      widgets.push(widget);
      res.json(widget);
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function findAllWidgetsForPage(req, res) {
    var pageWidgets = [];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === req.params.pageId) {
        pageWidgets.push(widgets[i]);
      }
    }
    res.json(pageWidgets);
  }

  function findWidgetById(req, res) {
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === req.params.widgetId) {
        res.json(widgets[i]);
        return;
      }
    }
    res.status(404).send('Widget with that ID does not exist.');
  }

  function updateWidget(req, res) {
    if (req.body) {
      for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id === req.params.widgetId) {
          widgets[i] = req.body;
          res.sendStatus(200);
          return;
        }
      }
      res.status(404).send('Widget does not exist.');
    } else {
      res.status(400).send('Empty request body is invalid.');
    }
  }

  function deleteWidget(req, res) {
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === req.params.widgetId) {
        widgets.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status(404).send('Widget does not exist.');
  }

  // Written to work once there are widgets that aren't all on the same page stored
  function reorderWidget(req, res) {
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);
    if (!isNaN(initial) && !isNaN(final)) {
      try {
        var count = 0;
        var widget = {};
        var up = initial > final;
        for (var i = 0; i < widgets.length; i++) {
          if (widgets[i].pageId === req.params.pageId) {
            if (count === initial) {
              widget = widgets[i];
              break;
            }
            count += 1;
          }
        }
        count = 0;
        for (var j = 0; j < widgets.length; j++) {
          if (widgets[j].pageId === req.params.pageId) {
            if (count === final) {
              if (up) {
                widgets.splice(j, 0, widget);
              } else {
                widgets.splice(j + 1, 0, widget);
              }
              break;
            }
            count += 1;
          }
        }
        if (up) { // moving up
          widgets.splice(initial + 1, 1);
        } else { // moving down
          widgets.splice(initial, 1);
        }
        res.sendStatus(200);
      } catch(error) {
        res.status(400).send('Initial and final indices are out of range');
      }
    } else {
      res.status(400).send('Initial and final indices must be provided');
    }
  }
};