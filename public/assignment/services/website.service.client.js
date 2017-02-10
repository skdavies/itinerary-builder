(function () {
  angular
    .module('WebAppMaker')
    .factory('WebsiteService', websiteService);

  function websiteService() {
    var websites = [
      { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
      { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
      { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
      { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
      { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
      { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    return {
      'createWebsite': createWebsite,
      'findWebsitesByUser': findWebsitesByUser,
      'findWebsiteById': findWebsiteById,
      'updateWebsite': updateWebsite,
      'deleteWebsite': deleteWebsite
    };

    function createWebsite(userId, website) {
      website.developerId = userId;
      return websites.push(website);
    }

    function findWebsitesByUser(userId) {
      var userWebsites = [];
      for (var i = 0; i < websites.length; i++) {
        if (websites[i].developerId === userId) {
          return userWebsites.push(websites[i]);
        }
      }
      return userWebsites;
    }

    function findWebsiteById(websiteId) {
      for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id === websiteId) {
          return websites[i];
        }
      }
      return null;
    }

    function updateWebsite(websiteId, website) {
      for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id === websiteId) {
          websites[i] = website;
        }
      }
    }

    function deleteWebsite(websiteId) {
      for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id === websiteId) {
          websites.splice(i, 1);
        }
      }
    }
  }

})();