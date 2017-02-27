(function () {
  angular
    .module('WebAppMaker')
    .factory('UserService', userService);

  function userService($http) {
    return {
      'createUser': createUser,
      'findUserById': findUserById,
      'findUserByUsername': findUserByUsername,
      'findUserByCredentials': findUserByCredentials,
      'updateUser': updateUser,
      'deleteUser': deleteUser
    };

    function createUser(user) {
      return $http.post('/assignment/api/user', user);
    }

    function findUserById(userId) {
      return $http.get('/assignment/api/user/' + userId);
    }

    function findUserByUsername(username) {
      return $http.get('/assignment/api/user?username=' + username);
    }

    function findUserByCredentials(username, password) {
      return $http.get('/assignment/api/user?username=' + username + '&password=' + password);
    }

    function updateUser(userId, user) {
      return $http.put('/assignment/api/user/' + userId, user);
    }

    function deleteUser(userId) {
      return $http.delete('/assignment/api/user/' + userId);
    }
  }

})();