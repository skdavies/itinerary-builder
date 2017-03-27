(function () {
  angular
    .module('ItineraryPlanner')
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
      return $http.post('/project/api/users', user);
    }

    function findUserById(userId) {
      return $http.get('/project/api/users/' + userId);
    }

    function findUserByUsername(username) {
      return $http.get('/project/api/users?username=' + username);
    }

    function findUserByCredentials(username, password) {
      return $http.get('/project/api/users?username=' + username + '&password=' + password);
    }

    function updateUser(userId, user) {
      return $http.put('/project/api/users/' + userId, user);
    }

    function deleteUser(userId) {
      return $http.delete('/project/api/users/' + userId);
    }
  }

})();