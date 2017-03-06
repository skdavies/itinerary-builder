(function () {
  angular
    .module('WebAppMaker')
    .factory('FlickrService', FlickService);

  function FlickService($http) {

    var key = 'your-flickr-key'; //TODO get key
    var secret = 'your-flickr-secret';
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