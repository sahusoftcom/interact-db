'use strict';

angular.module('interactDbApp')
  .controller('ModelListCtrl', function ($scope, $location, InteractDBDataService, IDBMasterDataService, GUIDService) {

  	$scope.InteractDBDataService = InteractDBDataService;

    $scope.addNewModel = function(){
      $scope.InteractDBDataService.models.push({
        name: $scope.newModelName,
        id: GUIDService(),
        configuration: {
        	softDeletes: false,
            timestamps: false,
            engine: 'InnoDB',
            primaryKey: [],
            indexes: {
                unique: [],
                index: []
            },
            foreignKeys: [
            ]
        },

        columns: [
        	{
        		name: 'id',
                dataType: 'bigIncrements',
                allowNull: false,
                unsigned: false,
                id: GUIDService()
        	}
        ]
      });

      $scope.newModelName = '';

    };

    $scope.deleteModel = function(index) {
        $scope.InteractDBDataService.models.splice(index, 1);
    };

  });