'use strict';

angular.module('interactDbApp')
  .controller('NavbarCtrl', function ($scope, $location) {

    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Awesome',
        'link': '/awesome'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });