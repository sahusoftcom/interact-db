'use strict';

angular.module('interactDbApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things')
    	.then(function successCallback(awesomeThings) {
      		$scope.awesomeThings = awesomeThings;
    	}, function errorCallback(awesomeThings) {
    		$scope.awesomeThings = "failed";
    	});

  });
