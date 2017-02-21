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
      return $http.post('/api/user/' + userId + '/website', website);
    }

    function findWebsitesByUser(userId) {
      return $http.get('/api/user/' + userId + '/website');
    }

    function findWebsiteById(websiteId) {
      return $http.get('/api/website/' + websiteId);
    }

    function updateWebsite(websiteId, website) {
      return $http.put('/api/website/' + websiteId, website);
    }

    function deleteWebsite(websiteId) {
      return $http.delete('/api/website/' + websiteId);
    }
  }

})();