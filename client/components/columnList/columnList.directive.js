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

			controller: function($scope, $element, $attrs, $transclude) {

				$scope.addNewColumn = function () {

				  $scope.model.columns.push({
				    name: $scope.newColumnName
				  });

				  $scope.newColumnName = '';
				  
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