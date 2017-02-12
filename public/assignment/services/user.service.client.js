(function () {
  angular
    .module('WebAppMaker')
    .factory('UserService', userService);

  function userService() {
    var users = [
      { _id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder' },
      { _id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley' },
      { _id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia' },
      { _id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi' }
    ];
    return {
      'createUser': createUser,
      'findUserById': findUserById,
      'findUserByUsername': findUserByUsername,
      'findUserByCredentials': findUserByCredentials,
      'updateUser': updateUser,
      'deleteUser': deleteUser
    };

    function createUser(user) {
      var userObj = {
        username: user.username,
        password: user.password,
        _id: (parseInt(users[users.length - 1]._id) + 1).toString()
      };
      users.push(userObj);
    }

    function findUserById(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]._id === userId) {
          return users[i];
        }
      }
      return null;
    }

    function findUserByUsername(username) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          return users[i];
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          return users[i];
        }
      }
      return null;
    }

    function updateUser(userId, user) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]._id === userId) {
          users[i].username = user.username;
          users[i].firstName = user.firstName;
          users[i].lastName = user.lastName;
        }
      }
    }

    function deleteUser(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]._id === userId) {
          users.splice(i, 1);
        }
      }
    }
  }

})();