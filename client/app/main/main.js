'use strict';

angular.module('interactDbApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('modelView', {
        url: '/model/:index',
        templateUrl: 'app/modelView/modelView.html',
        controller: 'ModelViewCtrl'
      });
      
    $stateProvider.state('relationships', {
      url: '/relationships/',
      templateUrl: 'app/relationships/relationships.html',
      controller: 'RelationshipsCtrl'
    });

  });