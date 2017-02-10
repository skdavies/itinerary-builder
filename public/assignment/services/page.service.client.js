(function () {
  angular
    .module('WebAppMaker')
    .factory('PageService', pageService);

  function pageService() {
    var pages = [
      { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
      { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
      { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];
    return {
      'createPage': createPage,
      'findPagesByWebsiteId': findPagesByWebsiteId,
      'findPageById': findPageById,
      'updatePage': updatePage,
      'deletePage': deletePage
    };

    function createPage(websiteId, page) {
      page.websiteId = websiteId;
      return pages.push(page);
    }

    function findPagesByWebsiteId(websiteId) {
      var websitePages = [];
      for (var i = 0; i < pages.length; i++) {
        if (pages[i].websiteId === websiteId) {
          return websitePages.push(pages[i]);
        }
      }
      return websitePages;
    }

    function findPageById(pageId) {
      for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id === pageId) {
          return pages[i];
        }
      }
      return null;
    }

    function updatePage(pageId, page) {
      for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id === pageId) {
          pages[i] = page;
        }
      }
    }

    function deletePage(pageId) {
      for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id === pageId) {
          pages.splice(i, 1);
        }
      }
    }
  }

})();