'use strict';

angular.module('interactDbApp')
	.directive('columnList', [function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				'model': '=',
			}, // {} = isolate, true = child, false/undefined = no change

			controller: function($scope, $element, InteractDBDataService, IDBMasterDataService, GUIDService, $stateParams, $attrs, $transclude) {

				$scope.InteractDBDataService = InteractDBDataService;
				$scope.modelIndex = $stateParams.index;
				$scope.columns = $scope.InteractDBDataService.models[$scope.modelIndex].columns;
				$scope.allowNull = $scope.unsigned = false;

				$scope.addNewColumn = function () {
					var incExists = _.find($scope.InteractDBDataService.models[$scope.modelIndex].columns, function(col) {
					  return col.dataType == 'bigIncrements' || col.dataType == 'increments';
					})
					if(incExists && ($scope.selectedDataType == 'bigIncrements' || $scope.selectedDataType == 'increments')){
						alert('only one column can have increment or bigIncrement datatype');
						return;
					}

					$scope.InteractDBDataService.models[$scope.modelIndex].columns.push({
					    name: $scope.newColumnName,
					    dataType: $scope.selectedDataType,
					    allowNull: $scope.allowNull,
					    defaultVal: $scope.defaultVal,
					    length: $scope.colLength,
					    unsigned: $scope.unsigned,
					    id: GUIDService()
					});

				  	$scope.newColumnName = $scope.selectedDataType = $scope.colLength = $scope.defaultVal = '';
				  	$scope.allowNull = $scope.unsigned = false;

				  	$scope.$emit('commit', 'new column added');
				};

				$scope.dataTypes = IDBMasterDataService.dataTypes;

				$scope.hasLength = function(col) {
					if(typeof col == 'object') {
						var index = $scope.dataTypes.map( function(type) {
							return type.name;
						}).indexOf(col.dataType);

						if($scope.dataTypes[index]) {
							col.length = $scope.dataTypes[index].defaultLength;
							return $scope.dataTypes[index].hasLength;
						}
						else
							return false;
					}
					else if(col != undefined) {
						var index = $scope.dataTypes.map( function(type) {
							return type.name;
						}).indexOf($scope.selectedDataType);

						if($scope.dataTypes[index]) {
							$scope.colLength = $scope.dataTypes[index].defaultLength;
							return $scope.dataTypes[index].hasLength;
						}
						else
							return false;
					}
				};

				$scope.hasUnsigned = function(col) {
					var index = $scope.dataTypes.map( function(type) {
						return type.name;
					}).indexOf(col);
					if($scope.dataTypes[index])
						return $scope.dataTypes[index].hasUnsigned;
					else
						return false;
				};

				$scope.hasDefault = function(col) {
					var index = $scope.dataTypes.map( function(type) {
						return type.name;
					}).indexOf(col);
					if($scope.dataTypes[index])
						return !$scope.dataTypes[index].noDefault;
					else
						return false;
				};

				$scope.deleteColumn = function(index) {
					$scope.InteractDBDataService.models[$stateParams.index].columns.splice(index, 1);
					$scope.$emit('commit', 'column deleted');
				};

				$scope.commitChange = function() {
					$scope.$emit('commit', 'column field updated');
				};

			},

			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'components/columnList/columnList.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);