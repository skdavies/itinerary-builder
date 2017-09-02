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
      'unfollowUser': unfollowUser,
      'login': login,
      'logout': logout,
      'loggedin': loggedin,
      'isAdmin': isAdmin
    };

    function register(user) {
      return $http.post('/api/users/register', user);
    }

    function findUserById(userId) {
      return $http.get('/api/users/' + userId);
    }

    function findUserByUsername(username) {
      return $http.get('/api/users?username=' + username);
    }

    function findFollowingItineraries(userId) {
      return $http.get('/api/users/' + userId + '/following/itineraries');
    }

    function findTrendingUsers() {
      return $http.get('/api/users/trending/hot');
    }

    function findAllUsers() {
      return $http.get('/api/users');
    }

    function updateUser(userId, user) {
      return $http.put('/api/users/' + userId, user);
    }

    function deleteUser(userId) {
      return $http.delete('/api/users/' + userId);
    }

    function followUser(userId, followId) {
      return $http.put('/api/users/' + userId + '/follow/' + followId);
    }

    function unfollowUser(userId, unfollowId) {
      return $http.put('/api/users/' + userId + '/unfollow/' + unfollowId);
    }

    function login(user) {
      return $http.post('/api/users/login', user);
    }

    function logout() {
      return $http.post('/api/users/logout');
    }

    function loggedin() {
      return $http.get('/api/users/loggedin');
    }

    function isAdmin() {
      return $http.get('/api/users/isadmin');
    }
  }

})();