'use strict';

angular.module('interactDbApp')
	.directive('interactHeader', [function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,

			controller: function($scope, $element, $state, $http, $rootScope, IDBMasterDataService, InteractDBDataService, $attrs, $transclude) {
				$scope.undo = function() {
					if($state.current.name.indexOf("relationships") > -1 )
						$scope.$emit('undo', 'undo relationships change');
					else if($state.current.name.indexOf("model") > -1)
						$scope.$emit('undo', 'undo models change');
				};

				$scope.redo = function() {
					if($state.current.name.indexOf("relationships") > -1 )
						$scope.$emit('redo', 'redo relationships change');
					else if($state.current.name.indexOf("model") > -1)
						$scope.$emit('redo', 'redo models change');
				};

				if($state.current.name.indexOf("relationships") > -1 ) {
					$scope.canUndo = $rootScope.canUndoRelationship;
					$scope.canRedo = $rootScope.canRedoRelationship;
				}
				else if($state.current.name.indexOf("model") > -1) {
					$scope.canUndo = $rootScope.canUndoModel;
					$scope.canRedo = $rootScope.canRedoModel;
				}

				$scope.backVisible = $state.current.name.indexOf("main") > -1 ? false : true;

				$scope.saveData = function() {
					var req = {
						method: 'POST',
						url: '/api/save',
						headers: {
					   		'Content-Type': 'application/json'
						},
						data: InteractDBDataService
					};

					$http(req).then(function(response){
						alert('Migrations and models were generated successfully');
					}, 
					function(response){
						alert('There was some error');
					});
				};

			},

			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'components/interactHeader/interactHeader.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);