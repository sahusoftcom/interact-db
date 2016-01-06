'use strict';

var app = angular.module('interactDbApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'sahusoft.history'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $http, InteractDBDataService, History){
    var req = {
      method: 'POST',
      url: '/api/get'
    };

    $http(req).then(function(response){
      angular.copy(response.data, InteractDBDataService);
      
      InteractDBDataService.version = response.data.version+1;

      History.watch('models', InteractDBDataService);
      History.push('models', InteractDBDataService, 'Initialization');

      History.watch('relationships', InteractDBDataService);
      History.push('relationships', InteractDBDataService, 'Initialization');
    }, 
    function(response){
      console.log('failure');
    });

    $rootScope.$on('commit', function(event, data) {
        if(data.indexOf("relationship") > -1)
            History.push('relationships', InteractDBDataService, data);
        else
            History.push('models', InteractDBDataService, data);
    });

    $rootScope.$on('undo', function(event, data){
        if(data.indexOf("relationship") > -1)
            History.undo('relationships', InteractDBDataService);
        else
            History.undo('models', InteractDBDataService);
    });

    $rootScope.$on('redo', function(event, data){
        if(data.indexOf("relationship") > -1)
            History.redo('relationships', InteractDBDataService);
        else
            History.redo('models', InteractDBDataService);
    });

    $rootScope.canUndoModel = function() {
        return History.canUndo('models', InteractDBDataService);
    };

    $rootScope.canRedoModel = function() {
        return History.canRedo('models', InteractDBDataService);
    };

    $rootScope.canUndoRelationship = function() {
        return History.canUndo('relationships', InteractDBDataService);
    };

    $rootScope.canRedoRelationship = function() {
        return History.canRedo('relationships', InteractDBDataService);
    };

});
