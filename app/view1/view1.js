'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .factory('myFactory1', function departments (){
        var obj = {};
        obj.data = [
            {"department":"IT", "location":"Ohio", "emp":"John Doe", },
            {"department":"HRM", "location":"Indiana","emp":"Catelyn Jones"},
            {"department":"Accounting", "location":"Washington","emp":"Tyler Lee"},
            {"department":"Marketing", "location":"New York", "emp":"Peter Smith",},
            {"department":"Legal Affairs", "location":"California", "emp":"Jack Spiker"}];
        return obj;
    })

    .controller('View1Ctrl', [ '$scope','myFactory1', function($scope, myFactory1) {
        //$scope.saved = localStorage.getItem('save');
        var data = myFactory1.data;
        $scope.departments = data;
        //alert($scope.saved);
        //$scope.departments = (localStorage.getItem('save')!==null) ? JSON.stringify($scope.saved) : data;
        //alert($scope.departments);
        //localStorage.setItem('save',JSON.stringify($scope.departments));
        console.log("in controller...");
        $scope.newDepartment = {};
        $scope.info = "";

        $scope.saveDepartment = function(){
            if ($scope.newDepartment.emp !== undefined && $scope.newDepartment.department!== undefined && $scope.newDepartment.location!==undefined) {
                console.log("Saving...");
                $scope.departments.push($scope.newDepartment);
                $scope.info = "New Department Added Successfully!";
                $scope.newDepartment = {};
                //localStorage.setItem('save', JSON.stringify($scope.departments));
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
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };

    }]);