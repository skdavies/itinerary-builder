(function () {
  angular
    .module('ItineraryPlanner')
    .controller('PlaceDetailsController', placeDetailsController);

  function placeDetailsController($routeParams, PlaceService, loggedIn, $scope, DarkSkyService, $mdDialog) {
    var vm = this;
    vm.lookupWeather = lookupWeather;
    vm.showModal = showModal;

    function init() {
      vm.place = null;
      vm.weather = {
        selected: null,
        maxDate: new Date(),
        forecast: null
      };
      vm.placeId = $routeParams['placeId'];
      if (vm.placeId) {
        PlaceService.findPlaceById(vm.placeId).then(function (response) {
          initMap(response.data);
        });
      }
      vm.user = loggedIn;
      initAutocomplete();
    }

    init();

    function initAutocomplete() {
      var options = {};
      var input = document.getElementById('autocomplete-place-details');
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        PlaceService.findPlaceByGoogleId(place.place_id).then(function (response) {
          var myPlace = response.data;
          if (myPlace) {
            initMap(myPlace);
          } else {
            PlaceService.createPlace({
              googlePlaceId: place.place_id,
              name: place.name,
              lat: coordinates.lat,
              lng: coordinates.lng
            }).then(function (response) {
              initMap(response.data);
            });
          }
        });
        input.focus();
        input.value = '';
      });
    }

    function initMap(myPlace) {
      var map = new google.maps.Map(document.getElementById('map-place'), {
        zoom: 4,
        center: { lat: 42.346268, lng: -71.095764 }
      });
      var request = {
        placeId: myPlace.googlePlaceId
      };
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function (place, status) {
        if (status === 'OK') {
          var coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          new google.maps.Marker({
            position: coordinates,
            map: map
          });
          map.setCenter(coordinates);
          place.googleReviews = place.reviews;
          delete place.reviews;
          vm.place = $.extend({}, myPlace, place);
        } else {
          vm.place = myPlace;
        }
        $scope.$apply();
      });
    }

    function lookupWeather() {
      var date = vm.weather.selected;
      if (date) {
        DarkSkyService.timeMachineLookup(vm.place.geometry.location.lat(), vm.place.geometry.location.lng(), date.getTime() / 1000)
          .then(function (response) {
            vm.weather.forecast = JSON.parse(response.data);
          }, function (err) {
          });
      }
    }

    function showModal(ev) {
      $mdDialog.show({
        controller: AddSuggestionController,
        controllerAs: 'vm',
        templateUrl: '/views/place/place-details/modals/add-review.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function (place) {
        vm.place.reviews = place.reviews;
        vm.place.ads = place.ads;
      });

      function AddSuggestionController($mdDialog) {
        var modalVm = this;
        modalVm.cancel = cancel;
        modalVm.post = post;

        function cancel() {
          $mdDialog.cancel();
        }

        function post(text) {
          PlaceService.addPlaceReview(vm.place._id, { text: text }).then(function (response) {
            $mdDialog.hide(response.data);
          });
        }
      }
    }
  }
})();