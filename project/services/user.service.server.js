module.exports = function (app, model) {
  var passport = require('passport');
  var bcrypt = require("bcrypt-nodejs");
  var LocalStrategy = require('passport-local').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID_ITINERARY_PLANNER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_ITINERARY_PLANNER,
    callbackURL: process.env.GOOGLE_CALLBACK_URL_ITINERARY_PLANNER
    //TODO SET THESE IN HEROKU BEFORE DEPLOYING
  };

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new GoogleStrategy(googleConfig, googleStrategy));


  var userModel = model.userModel;

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post('/project/api/users/login', passport.authenticate('local'), login);
  app.get('/project/api/users/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/project/google/auth/cb', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/project/#/',
    failureRedirect: 'http://localhost:3000/project/#/'
    //TODO CHANGE FOR DEPLOY
  }));
  app.post('/project/api/users/logout', logout);
  app.get('/project/api/users/loggedin', loggedin);
  app.get('/project/api/users/isadmin', isAdmin);
  app.post('/project/api/users/register', register);
  app.get('/project/api/users', findUser);
  app.get('/project/api/users/:userId', findUserById);
  app.put('/project/api/users/:userId', updateUser);
  app.delete('/project/api/users/:userId', deleteUser);
  app.put('/project/api/users/:userId/follow/:followId', followUser);

  function localStrategy(username, password, done) {
    userModel.findUserByUsername(username).then(function (user) {
        if (user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);

        }
      }, function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }

  function googleStrategy(token, refreshToken, profile, done) {
    userModel.findUserByGoogleId(profile.id).then(function (user) {
      if (user) {
        done(null, user);
      } else {
        var newUser = {
          username: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          google: {
            id: profile.id
          }
        };
        userModel.createUser(newUser).then(function (user) {

        }, function (err) {
          done(err, null);
        });
      }
    }, function (err) {
      done(err, null);
    });
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

  function isAdmin(req, res) {
    if (req.isAuthenticated() && req.user.role && req.user.role === 'ADMIN') {
      res.json(req.user);
    } else {
      res.send(false);
    }
  }

  function register(req, res) {
    var user = req.body;
    if (user) {
      user.password = bcrypt.hashSync(user.password);
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
    if (req.query.username) {
      findUserByUsername(req, res);
    } else {
      findAllUsers(req, res);
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
        userModel.updateUser(req.params.userId, user).then(function (user) {
          res.json(user);
        }, function () {
          res.sendStatus(500);
        });
      } else if (req.user.role === 'USER' && req.user._id.toString() === user._id) {
        userModel.updateProfile(user).then(function (user) {
          res.json(user);
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

  function findUserByUsername(req, res) {
    userModel.findUserByUsername(req.query.username).then(function (user) {
      res.json(user);
    }, function () {
      res.sendStatus(500);
    });
  }

  function findAllUsers(req, res) {
    if (req.user.role === 'ADMIN') {
      userModel.findAllUsers().then(function (users) {
        res.json(users);
      }, function () {
        res.sendStatus(500);
      });
    } else {
      res.status(409).send('You do not have permission to do that.');
    }
  }

  function followUser(req, res) {
    userModel.followUser(req.params.userId, req.params.followId).then(function (user) {
      res.json(user);
    }, function () {
      res.sendStatus(500);
    });
  }
};