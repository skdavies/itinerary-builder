module.exports = function (app, model) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(localStrategy));

  var userModel = model.userModel;

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post('/project/api/users/login', passport.authenticate('local'), login);
  app.post('/project/api/users/logout', logout);
  app.get('/project/api/users/loggedin', loggedin);
  app.post('/project/api/users/register', register);
  app.get('/project/api/users', findUser);
  app.get('/project/api/users/:userId', findUserById);
  app.put('/project/api/users/:userId', updateUser);
  app.delete('/project/api/users/:userId', deleteUser);
  app.put('/project/api/users/:userId/follow/:followId', followUser);

  function localStrategy(username, password, done) {
    userModel.findUserByCredentials(username, password).then(function (user) {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      }, function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel.findUserById(user._id).then(function (user) {
        done(null, user);
      }, function (err) {
        done(err, null);
      }
    );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : null);
  }

  function register(req, res) {
    var user = req.body;
    if (user) {
      userModel.createUser(user).then(function (user) {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
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
    var user = req.body;
    if (user) {
      if (req.user.role === 'ADMIN') {
        userModel.updateUser(req.params.userId, user).then(function () {
          res.sendStatus(200);
        }, function () {
          res.sendStatus(500);
        });
      } else if (req.user.role === 'USER') {
        userModel.updateProfile(user).then(function () {
          res.sendStatus(200);
        }, function () {
          res.sendStatus(500);
        });
      }
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