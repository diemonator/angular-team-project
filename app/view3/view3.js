'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', [ '$scope', function($scope) {

        $scope.tasks = [
            {"description":"Clean the kitchen", "completed":"Yes"},
            {"description":"Clean the living room", "completed":"No"},
            {"description":"Clean the room", "completed":"No"},
            {"description":"Do the WEB2 homework", "completed":"Yes"}
        ];

        $scope.newTask = {};
        $scope.info = "";

        $scope.saveTask = function(){
            console.log("Saving...");
            $scope.tasks.push($scope.newTask);
            $scope.info = "New Task Added Successfully!";
            $scope.newTask = {};
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