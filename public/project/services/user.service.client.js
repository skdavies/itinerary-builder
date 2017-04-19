(function () {
  angular
    .module('ItineraryPlanner')
    .factory('UserService', userService);

  function userService($http) {
    return {
      'register': register,
      'findUserById': findUserById,
      'findUserByUsername': findUserByUsername,
      'findFollowingItineraries': findFollowingItineraries,
      'findTrendingUsers': findTrendingUsers,
      'findAllUsers': findAllUsers,
      'updateUser': updateUser,
      'deleteUser': deleteUser,
      'followUser': followUser,
      'login': login,
      'logout': logout,
      'loggedin': loggedin,
      'isAdmin': isAdmin
    };

    function register(user) {
      return $http.post('/project/api/users/register', user);
    }

    function findUserById(userId) {
      return $http.get('/project/api/users/' + userId);
    }

    function findUserByUsername(username) {
      return $http.get('/project/api/users?username=' + username);
    }

    function findFollowingItineraries(userId) {
      return $http.get('/project/api/users/' + userId + '/following/itineraries');
    }

    function findTrendingUsers() {
      return $http.get('/project/api/users/trending/hot');
    }

    function findAllUsers() {
      return $http.get('/project/api/users');
    }

    function updateUser(userId, user) {
      return $http.put('/project/api/users/' + userId, user);
    }

    function deleteUser(userId) {
      return $http.delete('/project/api/users/' + userId);
    }

    function followUser(userId, followId) {
      return $http.put('/project/api/users/' + userId + '/follow/' + followId);
    }

    function login(user) {
      return $http.post('/project/api/users/login', user);
    }

    function logout() {
      return $http.post('/project/api/users/logout');
    }

    function loggedin() {
      return $http.get('/project/api/users/loggedin');
    }

    function isAdmin() {
      return $http.get('/project/api/users/isadmin');
    }
  }

})();