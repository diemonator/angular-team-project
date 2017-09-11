'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    }]);

angular.module('myApp.Write1', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'Write1Ctrl'
        });
    }])
.controller('Write1Ctrl', function($scope) {
    $scope.employees = [
        {name: "John Smith", number: 123451, pcn: 654321},
        {name: "John Johnson", number: 123452, pcn: 654322},
        {name: "John Black", number: 123453, pcn: 654323},
        {name: "John White", number: 123454, pcn: 654324},
        {name: "John Lee", number: 123455, pcn: 654325},
        {name: "John Donald", number: 123456, pcn: 654326},
        {name: "John Free", number: 123457, pcn: 654327}];
});