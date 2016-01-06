'use strict';

angular.module('interactDbApp')
  .controller('ModelViewCtrl', function ($scope, $http, InteractDBDataService, $stateParams) {
    
    $scope.model = InteractDBDataService.models[$stateParams.index];

  	//$scope.model = InteractDBDataService.models

  });
