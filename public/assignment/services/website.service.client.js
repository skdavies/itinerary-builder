(function () {
  angular
    .module('WebAppMaker')
    .factory('WebsiteService', websiteService);

  function websiteService($http) {

    return {
      'createWebsite': createWebsite,
      'findWebsitesByUser': findWebsitesByUser,
      'findWebsiteById': findWebsiteById,
      'updateWebsite': updateWebsite,
      'deleteWebsite': deleteWebsite
    };

    function createWebsite(userId, website) {
      return $http.post('/assignment/api/user/' + userId + '/website', website);
    }

    function findWebsitesByUser(userId) {
      return $http.get('/assignment/api/user/' + userId + '/website');
    }

    function findWebsiteById(websiteId) {
      return $http.get('/assignment/api/website/' + websiteId);
    }

    function updateWebsite(websiteId, website) {
      return $http.put('/assignment/api/website/' + websiteId, website);
    }

    function deleteWebsite(websiteId) {
      return $http.delete('/assignment/api/website/' + websiteId);
    }
  }

})();