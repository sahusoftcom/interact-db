'use strict';

angular.module('interactDbApp')
	.directive('modelSettings', [function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				'model': '=',
			}, // {} = isolate, true = child, false/undefined = no change

			controller: function($scope, $element, $stateParams, IDBMasterDataService, InteractDBDataService, GUIDService, $attrs, $transclude) {
				$scope.InteractDBDataService = InteractDBDataService;
				$scope.engines = IDBMasterDataService.storageEngines;
				$scope.indexes = IDBMasterDataService.indexes;
				$scope.FKOptions = IDBMasterDataService.FKOptions;
				$scope.modelIndex = $stateParams.index;

				$scope.addForeignKey = function() {
					var refColumnDataType = _.result(_.find($scope.fkRefModel.columns, function(column) {
					  return column.name == $scope.fkRefColumn;
					}), 'dataType');

					if(refColumnDataType == 'bigIncrements' || refColumnDataType == 'increments') {
						var isUnsigned = _.result(_.find(InteractDBDataService.models[$scope.modelIndex].columns, function(column) {
							return column.name == $scope.fkColumn;
						}), 'unsigned');

						if(!isUnsigned) {
							alert('When creating a foreign key that references an incrementing integer, foreign key column must be unsigned.');
							return;
						}
					}

					$scope.InteractDBDataService.models[$scope.modelIndex].configuration.foreignKeys.push(
						{
							id: GUIDService(),
							column: $scope.fkColumn,
							referenceModel: $scope.fkRefModel.name,
							referenceColumn: $scope.fkRefColumn,
							onDelete: $scope.onDelete,
							onUpdate: $scope.onUpdate
						}
					);

					$scope.fkColumn =  $scope.fkRefColumn = '';
					$scope.$emit('commit', 'new Foreign Key added');
				};

				$scope.getModel = function(selectedModel) {
					var index = $scope.InteractDBDataService.models.map( function(model) {
						return model.name;
					}).indexOf(selectedModel);
					if($scope.InteractDBDataService.models[index])
						return $scope.InteractDBDataService.models[index];
					else
						return '';
				};

				$scope.deleteFK = function(index) {
					$scope.InteractDBDataService.models[$scope.modelIndex].configuration.foreignKeys.splice(index, 1);
					$scope.$emit('commit', 'Foreign Key deleted');
				};

				$scope.commitChange = function() {
					$scope.$emit('commit', 'model configuration updated');
				};
			},

			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'components/modelSettings/modelSettings.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);