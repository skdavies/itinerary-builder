module.exports = function (app, model) {

  var userModel = model.userModel;

  app.post('/project/api/users', createUser);
  app.get('/project/api/users', findUser);
  app.get('/project/api/users/:userId', findUserById);
  app.put('/project/api/users/:userId', updateUser);
  app.delete('/project/api/users/:userId', deleteUser);
  app.put('/project/api/users/:userId/follow/:followId', followUser);

  function createUser(req, res) {
    var user = req.body;
    if (user) {
      userModel.createUser(user).then(function (user) {
        res.json(user);
      }, function (error) {
        if (error.code === 11000) {
          res.status(409).send('A user with that username already exists.');
        } else {
          res.status(500);
        }
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function findUser(req, res) {
    if (req.query.username && req.query.password) {
      findUserByCredentials(req, res);
    } else if (req.query.username) {
      findUserByUsername(req, res);
    } else {
      res.status(400).send('Missing query parameters.');
    }
  }

  function findUserById(req, res) {
    userModel.findUserById(req.params.userId).then(function (user) {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User with that ID does not exist.');
      }
    }, function () {
      res.sendStatus(500);
    })
  }

  function updateUser(req, res) {
    if (req.body) {
      userModel.updateUser(req.params.userId, req.body).then(function () {
        res.sendStatus(200);
      }, function () {
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Invalid request body.');
    }
  }

  function deleteUser(req, res) {
    userModel.deleteUser(req.params.userId).then(function () {
      res.sendStatus(200);
    }, function () {
      res.sendStatus(500);
    })
  }

  function findUserByCredentials(req, res) {
    userModel.findUserByCredentials(req.query.username, req.query.password).then(function (user) {
      res.json(user);
    }, function () {
      res.sendStatus(500);
    });
  }

  function findUserByUsername(req, res) {
    userModel.findUserByUsername(req.query.username).then(function (user) {
      res.json(user);
    }, function () {
      res.sendStatus(500);
    });
  }

  function followUser(req, res) {
    userModel.followUser(req.params.userId, req.params.followId).then(function (user) {
      res.json(user);
    }, function () {
      res.sendStatus(500);
    });
  }
};