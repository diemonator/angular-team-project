'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [function() {

}]);

angular.module('myApp.Write3', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'Write3Ctrl'
        });
    }])
    .controller('Write3Ctrl', function($scope) {
        $scope.tasks = [
            {name: "Work"},
            {name: "Develop version 3.2"},
            {name: "Relax"},
            {name: "Migrate from SVN to Git"}
        ];
    });