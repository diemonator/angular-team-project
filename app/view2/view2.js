'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [ '$scope', function($scope) {

        $scope.employees = [
            {"name":"John Doe", "occupation":"Developer", "state":"Ohio"},
            {"name":"Catelyn Jones", "occupation":"Secretary", "state":"Indiana"},
            {"name":"Tyler Lee", "occupation":"Manager", "state":"Washington"},
            {"name":"Peter Smith", "occupation":"CEO", "state":"New York"},
            {"name":"Jack Spiker", "occupation":"Lawyer", "state":"California"}
        ];

        $scope.newEmployee = {};
        $scope.info = "";

        $scope.saveEmployee = function(){
            console.log("Saving...");
            $scope.employees.push($scope.newEmployee);
            $scope.info = "New Employee Added Successfully!";
            $scope.newEmployee = {};
        };

        $scope.selectEmployee = function(emp){
            $scope.clickedEmployee = emp;
        };

        $scope.deleteEmployee = function(){
            console.log($scope.employees.indexOf($scope.clickedEmployee));
            $scope.employees.splice($scope.employees.indexOf($scope.clickedEmployee), 1);
            $scope.info = "Employee Deleted Successfully!";
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };


    }]);