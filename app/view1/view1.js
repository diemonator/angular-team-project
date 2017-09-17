'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [ '$scope', function($scope) {
        console.log("in controller...");
        $scope.newDepartment = {};
        $scope.info = "";

        $scope.departments = [
            {name: "Marketing", location:"NYC"},
            {name: "IT", location:"L.A."},
            {name: "Sales", location:"Ohio"}
        ];

        $scope.saveDepartment = function(){
            console.log("Saving...");
            $scope.departments.push($scope.newDepartment);
            $scope.info = "New Department Added Successfully!";
            $scope.newDepartment = {};
        };

        $scope.selectDepartment = function(department){
            $scope.clickedDepartment = department;
        };

        $scope.deleteDepartment = function(){
            console.log($scope.departments.indexOf($scope.clickedDepartment));
            $scope.departments.splice($scope.departments.indexOf($scope.clickedDepartment), 1);
            $scope.info = "Department Deleted Successfully!";
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };

    }]);