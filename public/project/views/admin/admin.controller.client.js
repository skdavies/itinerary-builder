(function () {
  angular
    .module('ItineraryPlanner')
    .controller('AdminController', adminController);

  function adminController(admin, UserService, PlaceService, ItineraryService, $location) {
    var vm = this;
    vm.logout = logout;
    vm.editUser = editUser;
    vm.deleteUser = deleteUser;
    vm.editPlace = editPlace;
    vm.deletePlace = deletePlace;
    vm.editItinerary = editItinerary;
    vm.deleteItinerary = deleteItinerary;
    vm.toggleEditUser = toggleEditUser;
    vm.toggleEditPlace = toggleEditPlace;

    function init() {
      if (!admin || admin.role !== 'ADMIN') {
        $location.url('/');
      }
      vm.user = admin;
      UserService.findAllUsers().then(function (response) {
        vm.users = response.data;
      });
      PlaceService.findAllPlaces().then(function (response) {
        vm.places = response.data;
      });
      ItineraryService.findAllItineraries().then(function (response) {
        vm.itineraries = response.data;
        console.log(response.data);
      });
      $('#myTab a:first').tab('show');
    }

    init();

    function logout() {
      UserService.logout().then(function () {
        $location.url('/');
      });
    }

    function editUser() {
      UserService.updateUser(vm.user._id, vm.user).then(function (response) {
        toggleEditUser();
        vm.success = 'User successfully updated.';
        UserService.findAllUsers().then(function (response) {
          vm.users = response.data;
        }, function (err) {
          vm.error = 'The data may be out of date, please refresh.';
        });
      }, function (err) {
        vm.error = 'Something went wrong.';
      });
    }

    function deleteUser(user) {
      var sure = confirm('Are you sure? This cannot be undone.');
      if (sure) {
        UserService.deleteUser(user._id).then(function () {
          vm.success = 'User successfully deleted.';
          UserService.findAllUsers().then(function (response) {
            vm.users = response.data;
          }, function (err) {
            vm.error = 'The data may be out of date, please refresh.';
          });
        }, function (err) {
          vm.error = err.message;
        });
      }
    }

    function editPlace() {

    }

    function deletePlace(place) {
      var sure = confirm('Are you sure? This cannot be undone.');
      if (sure) {
        PlaceService.deletePlace(place._id).then(function () {
          vm.success = 'Place successfully deleted.';
          PlaceService.findAllPlaces().then(function (response) {
            vm.places = response.data;
          }, function (err) {
            vm.error = 'The data may be out of date, please refresh.';
          });
        }, function (err) {
          vm.error = err.message;
        });
      }
    }

    function editItinerary() {

    }

    function deleteItinerary(itinerary) {

    }

    function toggleEditUser() {
      vm.success = null;
      vm.error = null;
      $('#userModal').modal('toggle');
    }
    
    function toggleEditPlace() {
      vm.success = null;
      vm.error = null;
      $('#placeModal').modal('toggle');
    }

  }
})();