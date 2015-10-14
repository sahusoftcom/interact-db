'use strict';

angular.module('interactDbApp')
  .controller('ModelListCtrl', function ($scope, $location, InteractDBDataService) {

  	$scope.models = InteractDBDataService.models;

    $scope.addNewModel = function(){

      $scope.models.push({
        name: $scope.newModelName
      });

      $scope.newModelName = '';

    }

  });