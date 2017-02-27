(function() {
  angular
    .module('WebAppMaker')
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/user/templates/login.view.client.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'views/user/templates/login.view.client.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'views/user/templates/register.view.client.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/user/:uid', {
        templateUrl: 'views/user/templates/profile.view.client.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website', {
        templateUrl: 'views/website/templates/website-list.view.client.html',
        controller: 'WebsiteListController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/new', {
        templateUrl: 'views/website/templates/website-new.view.client.html',
        controller: 'WebsiteNewController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid', {
        templateUrl: 'views/website/templates/website-edit.view.client.html',
        controller: 'WebsiteEditController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page', {
        templateUrl: 'views/page/templates/page-list.view.client.html',
        controller: 'PageListController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page/new', {
        templateUrl: 'views/page/templates/page-new.view.client.html',
        controller: 'PageNewController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page/:pid', {
        templateUrl: 'views/page/templates/page-edit.view.client.html',
        controller: 'PageEditController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page/:pid/widget', {
        templateUrl: 'views/widget/templates/widget-list.view.client.html',
        controller: 'WidgetListController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page/:pid/widget/new', {
        templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
        controller: 'WidgetNewController',
        controllerAs: 'vm'
      })
      .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/:new?', {
        templateUrl: 'views/widget/templates/widget-edit.view.client.html',
        controller: 'WidgetEditController',
        controllerAs: 'vm'
      });
  }
})();