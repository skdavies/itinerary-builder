(function () {
  angular
    .module('ItineraryPlanner')
    .controller('AdminController', adminController);

  function adminController(admin, UserService, PlaceService, ItineraryService, $location, $mdDialog) {
    var vm = this;
    vm.logout = logout;
    vm.deleteUser = deleteUser;
    vm.deleteItinerary = deleteItinerary;
    vm.toggleEditUser = toggleEditUser;
    vm.toggleEditPlace = toggleEditPlace;
    vm.toggleEditItinerary = toggleEditItinerary;

    function init() {
      if (!admin || admin.role !== 'ADMIN') {
        $location.url('/');
      }
      vm.admin = admin;
      UserService.findAllUsers().then(function (response) {
        vm.users = response.data;
      });
      PlaceService.findAllPlaces().then(function (response) {
        vm.places = response.data;
      });
      ItineraryService.findAllItineraries().then(function (response) {
        vm.itineraries = response.data;
      });
      vm.confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('This action cannot be undone once completed.')
        .ok('Yes, I\'m sure')
        .cancel('Never Mind');
    }

    init();

    function logout() {
      UserService.logout().then(function () {
        $location.url('/');
      });
    }

    function deleteUser(user) {
      $mdDialog.show(vm.confirm).then(function () {
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
      });
    }

    function deleteItinerary(itinerary) {
      $mdDialog.show(vm.confirm).then(function () {
        ItineraryService.deleteItinerary(itinerary._id).then(function () {
          vm.success = 'Itinerary successfully deleted.';
          ItineraryService.findAllItineraries().then(function (response) {
            vm.itineraries = response.data;
          }, function (err) {
            vm.error = 'The data may be out of date, please refresh.';
          });
        }, function (err) {
          vm.error = err.message;
        });
      });
    }

    function toggleEditUser(event, user, index) {
      vm.success = null;
      vm.error = null;
      $mdDialog.show({
        controller: EditModalController,
        controllerAs: 'vm',
        templateUrl: '/project/views/admin/modals/user-edit-modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        locals: {
          user: user,
          place: null,
          itinerary: null
        }
      }).then(function (user) {
        vm.users[index] = user;
      }, function () {
        // cancel modal
      });
    }
    
    function toggleEditPlace(event, place, index) {
      vm.success = null;
      vm.error = null;
      $mdDialog.show({
        controller: EditModalController,
        controllerAs: 'vm',
        templateUrl: '/project/views/admin/modals/place-edit-modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        locals: {
          user: null,
          place: place,
          itinerary: null
        }
      }).then(function (place) {
        vm.places[index] = place;
      }, function () {
        // cancel modal
      });
    }

    function toggleEditItinerary(event, itinerary, index) {
      vm.success = null;
      vm.error = null;
      $mdDialog.show({
        controller: EditModalController,
        controllerAs: 'vm',
        templateUrl: '/project/views/admin/modals/itinerary-edit-modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        locals: {
          user: null,
          place: null,
          itinerary: itinerary
        }
      }).then(function (itinerary) {
        vm.itineraries[index] = itinerary;
      }, function () {
        // cancel modal
      });
    }

    function EditModalController($mdDialog, user, place, itinerary) {
      var modalVm = this;
      modalVm.cancel = cancel;
      modalVm.editUser = editUser;
      modalVm.editPlace = editPlace;
      modalVm.editItinerary = editItinerary;
      modalVm.removeAd = removeAd;
      modalVm.removeReview = removeReview;
      modalVm.usr = angular.copy(user);
      modalVm.place = angular.copy(place);
      modalVm.itinerary = angular.copy(itinerary);

      function cancel() {
        $mdDialog.cancel();
      }

      function editUser() {
        UserService.updateUser(modalVm.usr._id, modalVm.usr).then(function (response) {
          $mdDialog.hide(response.data);
          vm.success = 'User successfully updated.';
        }, function (err) {
          vm.error = 'Something went wrong.';
        });
      }
      
      function editPlace() {
        PlaceService.updatePlace(modalVm.place._id, modalVm.place).then(function (response) {
          $mdDialog.hide(response.data);
          vm.success = 'Place successfully updated.';
        }, function (err) {
          vm.error = 'Something went wrong.';
        });
      }

      function removeAd(index) {
        if (modalVm.place.ads.length === 1) {
          modalVm.place.suggested = null;
        }
        modalVm.place.ads.splice(index, 1);
      }

      function removeReview(index) {
        modalVm.place.reviews.splice(index, 1);
      }
      
      function editItinerary() {
        ItineraryService.updateItinerary(modalVm.itinerary._id, modalVm.itinerary).then(function (response) {
          $mdDialog.hide(response.data);
          vm.success = 'Itinerary successfully updated.';
        }, function (err) {
          vm.error = 'Something went wrong.';
        });
      }
    }

  }
})();