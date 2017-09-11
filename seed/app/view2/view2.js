'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);

angular.module('myApp.Write2', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'Write2Ctrl'
        });
    }])
    .controller('Write2Ctrl', function($scope) {
        $scope.departments = [
            {name: "HR"},
            {name: "Workers"},
            {name: "R&D"},
            {name: "Developent"}
            ];
    });