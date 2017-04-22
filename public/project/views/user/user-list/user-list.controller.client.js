(function () {
  angular
    .module('ItineraryPlanner')
    .controller('UserListController', userListController);

  function userListController($location, UserService, loggedIn, $scope) {
    var vm = this;
    vm.viewUser = viewUser;
    vm.toggleFollowing = toggleFollowing;
    vm.unfollowUser = unfollowUser;
    vm.followingYn = followingYn;

    function init() {
      vm.control = {};
      vm.user = loggedIn;
      UserService.findTrendingUsers().then(function (response) {
        vm.trending = response.data;
      });
      vm.following = [];
      vm.followers = [];
      if (vm.user) {
        initUser();
      }
      $scope.$watch('vm.user', function(newVal, oldVal) {
        if (newVal && !oldVal) {
          initUser();
        }
      }, true);
    }

    init();

    function initUser() {
      UserService.findUserById(vm.user._id).then(function (response) {
        var user = response.data;
        vm.following = user.following.users;
        vm.followers = user.followers.users;
      });
    }

    function viewUser(userId) {
      $location.url('/user/' + userId);
    }

    function toggleFollowing(followId, index, event, view) {
      event.stopPropagation();
      if (vm.user) {
        if (vm.following.length && followingYn(followId)) {
          unfollowUser(followId, index, event)
        } else {
          UserService.followUser(vm.user._id, followId).then(function (response) {
            if (view === 'TRENDING') {
              vm.following.push(vm.trending[index]);
            } else if (view === 'FOLLOWERS') {
              vm.following.push(vm.followers[index]);
            }
          });
        }
      } else {
        vm.control.showLogin(event);
      }
    }

    function unfollowUser(unfollowId, index, event) {
      event.stopPropagation();
      UserService.unfollowUser(vm.user._id, unfollowId).then(function (response) {
        for(var i = 0; i < vm.following; i++) {
          if (vm.following[i]._id === unfollowId) {
            vm.following.splice(i, 1);
            break;
          }
        }
      });
    }

    function followingYn(followId) {
      if (vm.user && followId === vm.user._id) {
        return false;
      } else {
        return vm.following.length && vm.following.filter(function (u) {
            return u.followers.users.includes(followId)
          }).length === 0;
      }
    }

  }
})();