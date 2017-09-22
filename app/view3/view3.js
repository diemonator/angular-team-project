'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .factory('myFactory3', function departments (){
        var obj = {};
        obj.data = [
            {"emp":"John Doe", "department":"IT", "task":"Make JS", "deadline":"21.12.2018"},
            {"emp":"Catelyn Jones", "department":"HRM", "task":"Give checks","deadline":"21.12.2018"},
            {"emp":"Tyler Lee", "department":"Accounting", "task":"Manage","deadline":"21.12.2018"},
            {"emp":"Peter Smith", "department":"Marketing", "task":"Coordinate","deadline":"21.12.2018"},
            {"emp":"Jack Spiker", "department":"Legal Affairs", "task":"I sue u","deadline":"21.12.2018"}];
        return obj;
    })

    .controller('View3Ctrl', [ '$scope','myFactory3', function($scope,myFactory3) {

        $scope.tasks = myFactory3.data;

        $scope.newTask = {};
        $scope.info = "";

        $scope.saveTask = function(){
            if ($scope.newTask.emp !== undefined && $scope.newTask.department!== undefined && $scope.newTask.task!==undefined)
            {
            console.log("Saving...");
            $scope.tasks.push($scope.newTask);
            $scope.info = "New Task Added Successfully!";
            $scope.newTask = {};}
            else {
                alert("Try Again!");
            }
        };

        $scope.selectTask = function(task){
            $scope.clickedTask = task;
        };

        $scope.deleteTask = function(){
            console.log($scope.tasks.indexOf($scope.clickedTask));
            $scope.tasks.splice($scope.tasks.indexOf($scope.clickedTask), 1);
            $scope.info = "Task Deleted Successfully!";
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };

    }]);