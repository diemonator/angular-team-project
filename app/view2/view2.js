'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .factory('myFactory2', function departments (){
        var id = 1;
        var obj = {};
        var result = JSON.parse(localStorage.getItem("employees"));


//if there are no items in local storage departments then we have to populate
        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("employees"));
            console.log('IF SUCCEEDED');
        }
        else
        {

            obj.data = [
                {"name": "John Doe", "department": "IT", "id": ids()},
                {"name": "Catelyn Jones", "department": "HRM", "id": ids()},
                {"name": "Tyler Lee", "department": "Accounting", "id": ids()},
                {"name": "Peter Smith", "department": "Marketing", "id": ids()},
                {"name": "Jack Spiker", "department": "Legal Affairs", "id": ids()}];

            var temp = obj.data;

            localStorage.setItem("employees", JSON.stringify(temp));
            console.log("if didnt succeed");
        }

            return obj;

            function ids() {
                return id++;
            }

    })


    .controller('View2Ctrl', [ '$scope','myFactory2', function($scope,myFactory2) {

        $scope.employees = myFactory2.data;

        $scope.newEmployee = {};
        $scope.info = "";

        $scope.saveEmployee = function(){
            if ($scope.newEmployee.name !== undefined && $scope.newEmployee.department!== undefined)
            {
                $scope.newEmployee.id = $scope.employees.length+1;
            console.log("Saving...");
            $scope.employees.push($scope.newEmployee);
            $scope.info = "New Employee Added Successfully!";
            $scope.newEmployee = {};
                SaveEmployees($scope);
            }
            else {
                alert("Try again!");
            }
        };

        $scope.selectEmployee = function(emp){
            $scope.clickedEmployee = emp;
        };

        $scope.deleteEmployee = function(){
            console.log($scope.employees.indexOf($scope.clickedEmployee));
            $scope.employees.splice($scope.employees.indexOf($scope.clickedEmployee), 1);
            $scope.info = "Employee Deleted Successfully!";
            SaveEmployees($scope);
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };



        function SaveEmployees($scope) {

            localStorage.setItem("employees",JSON.stringify($scope.employees));
        }

    }]);