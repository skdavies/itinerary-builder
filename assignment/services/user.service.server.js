module.exports = function (app) {
  var users = [
    { _id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder' },
    { _id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley' },
    { _id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia' },
    { _id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi' }
  ];

  app.post('/api/user', createUser);
  app.get('/api/user', findUser);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);

  function createUser(req, res) {
    var user = req.body;
    if (user) {
      var existing = users.find(function (usr) {
        return usr.username === user.username;
      });
      if (existing) {
        res.status('409').send('A user with this username already exists.');
        return;
      }
      user._id = (parseInt(users[users.length - 1]._id) + 1).toString();
      users.push(user);
      res.json(user);
    } else {
      res.status('400').send('Invalid request body.');
    }
  }

  function findUser(req, res) {
    if (req.query.username && req.query.password) {
      findUserByCredentials(req, res);
    } else if (req.query.username) {
      findUserByUsername(req, res);
    }
  }

  function findUserById(req, res) {
    var user = users.find(function (user) {
      return user._id === req.params.userId;
    });
    if (user) {
      res.json(user);
    } else {
      res.status('404').send('User does not exist.');
    }
  }

  function updateUser(req, res) {
    if (req.body) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]._id === req.params.userId) {
          users[i] = req.body;
          res.sendStatus(200);
          return;
        }
      }
      res.status('404').send('User does not exist.'); // only hit if a user isn't found
    } else {
      res.status('400').send('Invalid request body.');
    }
  }

  function deleteUser(req, res) {
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === req.params.userId) {
        users.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status('404').send('User does not exist.'); // only hit if a user isn't found
  }

  function findUserByCredentials(req, res) {
    var user = users.find(function (user) {
      return user.password === req.query.password && user.username === req.query.username;
    });
    if (user) {
      res.json(user);
    } else {
      res.status('404').send('User does not exist.');
    }
  }

  function findUserByUsername(req, res) {
    var user = users.find(function (user) {
      return user.username === req.query.username;
    });
    if (user) {
      res.json(user);
    } else {
      res.status('404').send('User does not exist.');
    }
  }
};