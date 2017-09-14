
'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', function($scope) {
    $scope.departments = [
            {   
                "Name":"Management",
                "Location":"NY.C"
            },
            {
                "Name":"Sales",
                "Location":"Chicago",
            },
            {
                "Name":"Marketing",
                "Location":"Boston"
            },
            {
                "Name":"IT",
                "Location":"Ohio"
            }
        ];

    $scope.selectEdit = function (Id) {
        var index = getSelectedIndex(Id);
        var department = $scope.departments[index];
        $scope.id = department.Id;
        $scope.name = department.Name;
        $scope.location = department.Location;
    };

    function getSelectedIndex(Id) {
        for (var i=0; i<$scope.departments.length; i++)
            if ($scope.departments[i].Id === Id)
                return i;
        return -1;
    }

    $scope.add = function () {
        $scope.departments.push({
            "Id":$scope.Id ,
            "Name":$scope.Name,
            "Location":$scope.Location
        });
        $scope.Id = '';
        $scope.Name = '';
        $scope.Location = '';
    };

    $scope.edit = function () {
        var index = getSelectedIndex(Id);
        $scope.departments[index].Id = $scope.Id;
        $scope.departments[index].Name = $scope.Name;
        $scope.departments[index].Location = $scope.Location;
    };

    $scope.del = function (Id) {
        var index = getSelectedIndex(Id);
        alert(index);
        $scope.departments.splice(index,1);
    };

}]);