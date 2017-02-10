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
      return users.push(user);
    }

    function findUserById(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[u]._id === userId) {
          return users[u];
        }
      }
      return null;
    }

    function findUserByUsername(username) {
      for (var i = 0; i < users.length; i++) {
        if (users[u].username === username) {
          return users[u];
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      for (var i = 0; i < users.length; i++) {
        if (users[u].username === username && users[u].password === password) {
          return users[u];
        }
      }
      return null;
    }

    function updateUser(userId, user) {
      for (var i = 0; i < users.length; i++) {
        if (users[u]._id === userId) {
          users[u] = user;
        }
      }
    }

    function deleteUser(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[u]._id === userId) {
          users.splice(u, 1);
        }
      }
    }
  }

})();