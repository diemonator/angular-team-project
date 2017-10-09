'use strict';

angular.module('myApp.view3', ['ngRoute'])
angular.module('myApp.calendar', ['ui.calendar'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])


    .service('MyService3',['$http',function ($http) {
        this.getDepartments = function () {
            return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
        }
    }])


    .factory('myFactory3',['myFactory1','myFactory2', function (myFactory1,myFactory2){
        var obj = {};
        var id = 0;
        function ids() {
            return id++;
        }
        var result = JSON.parse(localStorage.getItem("tasks"));
        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("tasks"));
            console.log('IF SUCCEEDED');
        }
        else {
            obj.data = [
                {"id": ids(), "task": "Make JS", "deadline": "21.12.2018"},
                {"id": ids(), "task": "Give checks", "deadline": "21.12.2018"},
                {"id": ids(), "task": "Manage", "deadline": "21.12.2018"},
                {"id": ids(), "task": "Coordinate", "deadline": "21.12.2018"},
                {"id": ids(), "task": "I sue u", "deadline": "21.12.2018"}];
            var i;
            for (i = 0; i < obj.data.length; i++) {
                obj.data[i].dep = myFactory1.data[i].department;
                obj.data[i].emp = myFactory2.data[i].empName;
            }
            localStorage.setItem("tasks", JSON.stringify(obj.data));
            console.log("if didn't succeed");

        }
        return obj;
    }])

    .controller('View3Ctrl', [ '$scope','myFactory3', 'MyService3',function($scope,myFactory3,MyService3) {
        $scope.eventSources = [$scope.events];
        $scope.events = [  {"id":"1","title":"title","start":"2017-10-10","backgroundColor":"green"}];
        $scope.uiConfig = {
            calendar: {
                height: 700,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: function (event) {
                    $scope.selectedEvent = event;
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        }

        MyService3.getDepartments()
            .then(function (response) {
                $scope.tasks = response.data;
                console.log($scope.tasks);
            },function (error) {
                $scope.error = error;
            });

        $scope.newTask = {};
        $scope.info = "";

        $scope.saveTask = function(){
            if ($scope.newTask.title !== undefined && $scope.newTask.no!== undefined && $scope.newTask.deptNo!==undefined)
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