'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .factory('myFactory3',['myFactory1','myFactory2', function departments (myFactory1,myFactory2){
        var obj = {};
        var id = 0;
        function ids() {
            return id++;
        }
        var v = -1;
        var j = -1;
        function newDep () {
            j++;
            return myFactory1.data[j].department;
        }
        function newEmp () {
            v++;
            return myFactory2.data[v].empName;
        }
        /*var result = JSON.parse(localStorage.getItem("tasks"));


        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("tasks"));
            console.log('IF SUCCEEDED');
        }
        else
        {*/


        obj.data = [
            { "id":ids(), "task":"Make JS",     "deadline":"21.12.2018" },
            { "id":ids(), "task":"Give checks", "deadline":"21.12.2018" },
            { "id":ids(), "task":"Manage",      "deadline":"21.12.2018" },
            { "id":ids(), "task":"Coordinate",  "deadline":"21.12.2018" },
            { "id":ids(), "task":"I sue u",     "deadline":"21.12.2018" }];
            var temp = obj.data;

        var i;
        for (i=0;i<obj.data.length;i++)
        {
            obj.data[i].dep = newDep();
            obj.data[i].emp = newEmp()
        }

            localStorage.setItem("tasks",JSON.stringify(temp));
            console.log("if didnt succeed");


        return obj;
    }])

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
            $scope.newTask = {};
                SaveTasks($scope);
            }
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
            SaveTasks($scope);
        };

        $scope.clearInfo = function(){
            $scope.info = "";
        };


        function SaveTasks($scope) {

            localStorage.setItem("tasks",JSON.stringify($scope.tasks));
        }

    }]);