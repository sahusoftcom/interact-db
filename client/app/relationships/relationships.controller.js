'use strict';

angular.module('interactDbApp')
  .controller('RelationshipsCtrl', function ($scope, $http, InteractDBDataService, IDBMasterDataService, GUIDService) {
    $scope.InteractDBDataService = InteractDBDataService;

  	$scope.relationships = IDBMasterDataService.relationships;


  	$scope.addRelationship = function() {
        if(!$scope.InteractDBDataService.relationships[$scope.model1]) {
            $scope.InteractDBDataService.relationships[$scope.model1] = [];
        }

        $scope.InteractDBDataService.relationships[$scope.model1].push(
            {
                id: GUIDService(),
                relation: $scope.relation,
                withModel: $scope.model2
            }
        );

  		$scope.model1 = $scope.relation = $scope.model2 = '';
      $scope.$emit('commit', 'new relationship added');
  	};

  	$scope.deleteRelationship = function(index, relModel) {
  		$scope.InteractDBDataService.relationships[relModel].splice(index, 1);
        $scope.$emit('commit', 'relationship deleted');
  	};

    $scope.commitChange = function() {
        $scope.$emit('commit', 'relationship updated');
    };

  });
