(function () {
  angular
    .module('WebAppMaker')
    .factory('FlickrService', FlickService);

  function FlickService($http) {

    var key = 'd16f95841e477211f9e5ee20ab6fcd36';
    var secret = 'abefb5812435d639';
    var urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
      '&format=json&api_key=API_KEY&text=TEXT';

    return {
      'searchPhotos': searchPhotos
    };

    function searchPhotos(searchTerm) {
      var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
      return $http.get(url);
    }
  }

})();