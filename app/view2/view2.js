'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .service('MyService2',['$http',function ($http) {
        this.getDepartments = function () {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/employees');
        }
    }])

    .factory('myFactory2',function (){
        var id = 0;
        var obj = {};
        var result = JSON.parse(localStorage.getItem("employees"));
        function ids() {
            return id++;
        }
        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("employees"));
            console.log('IF SUCCEEDED');
        }
        else
        {
            obj.data = [
                { "empName":"John Doe",      "id":ids(),"dep":"IT" },
                { "empName":"Catelyn Jones", "id":ids(),"dep":"HRM" },
                { "empName":"Tyler Lee",     "id":ids(),"dep":"Accounting" },
                { "empName":"Peter Smith",   "id":ids(),"dep":"Marketing" },
                { "empName":"Jack Spiker",   "id":ids(),"dep":"Legal Affairs" }];
            localStorage.setItem("employees", JSON.stringify(obj.data));
            console.log("if didnt succeed");
        }
            return obj;
    })


    .controller('View2Ctrl', [ '$scope','myFactory2', 'MyService2', function($scope,myFactory2,MyService2) {

        MyService2.getDepartments()
            .then(function (response) {
                $scope.employees = response.data;
                console.log($scope.employees);
            },function (error) {
                $scope.error = error;
            });

        $scope.newEmployee = {};
        $scope.info = "";

        $scope.saveEmployee = function(){
            if ($scope.newEmployee.empName !== undefined && $scope.newEmployee.department!== undefined)
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