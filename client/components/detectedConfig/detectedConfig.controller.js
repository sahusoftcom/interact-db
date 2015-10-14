'use strict';

angular.module('interactDbApp')
  .controller('DetectedConfigCtrl', function ($scope, $location, InteractDBDataService) {

  	$scope.config = InteractDBDataService.meta;

  });