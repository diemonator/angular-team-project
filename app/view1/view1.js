'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .factory('myFactory1',['myFactory2','Service',function (myFactory2, Service){
        var obj = {};
        var id = 0;
        var result = JSON.parse(localStorage.getItem("departments"));
        function ids() {
            return id++;
        }
        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("departments"));
            console.log('IF SUCCEEDED');
        }
        else
        {
            obj.data = [
                { "department":"IT",            "location":"Ohio",       "depId":ids() },
                { "department":"HRM",           "location":"Indiana",    "depId":ids() },
                { "department":"Accounting",    "location":"Washington", "depId":ids() },
                { "department":"Marketing",     "location":"New York",   "depId":ids() },
                { "department":"Legal Affairs", "location":"California", "depId":ids() }];
            var i;
            for (i=0;i<obj.data.length;i++)
            {
                obj.data[i].emp = myFactory2.data[i].empName;
            }
            localStorage.setItem("departments",JSON.stringify(obj.data));
            console.log("if didnt succeed");
        }
        return obj;
    }])

    .controller('View1Ctrl', [ '$scope','myFactory1', 'Service',function($scope, myFactory1,Service) {
        var data = myFactory1.data;
        Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/departments')
            .then(function (response) {
                $scope.departments = response.data;
            },function (error) {
                $scope.error = error;
            });
        console.log("in controller...");
        $scope.newDepartment = {};
        $scope.info = "";

        $scope.saveDepartment = function(){
            if ($scope.newDepartment.no !== undefined && $scope.newDepartment.name!== undefined && $scope.newDepartment.code!==undefined) {
                console.log("Saving...");
                $scope.departments.push($scope.newDepartment);
                $scope.info = "New Department Added Successfully!";
                $scope.newDepartment = {};
                SaveDepartments($scope);
            }
            else {
                alert("Try again!");
            }
        };

        $scope.selectDepartment = function(department){
            $scope.clickedDepartment = department;
        };

        $scope.deleteDepartment = function(){
            console.log($scope.departments.indexOf($scope.clickedDepartment));
            $scope.departments.splice($scope.departments.indexOf($scope.clickedDepartment), 1);
            $scope.info = "Department Deleted Successfully!";
            SaveDepartments($scope);
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };

        function SaveDepartments($scope) {
            localStorage.setItem("departments",JSON.stringify($scope.departments));
        }

    }]);