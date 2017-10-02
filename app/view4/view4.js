'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .directive('myDirective',function () {
        return {
            template: '<table class="table table-striped">\
            <thead>\
            <tr>\
            <th>Employee</th>\
            <th>Department</th>\
            <th>Task</th>\
            <th>Deadline</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr>\
            <td>{{worker}} </td>\
            <td>{{workPlace}}</td>\
            <td>{{work}}</td>\
            <td>{{endDate}}</td>\
            </tr>\
            </tbody>\
            </table>'
        }
    })

    .factory('myFactory4',['myFactory1','myFactory2','myFactory3', function (myFactory1,myFactory2,myFactory3)
    {
        var id = 0;
        var obj = {};
        obj.data = [];

        for (var i=0;i<myFactory3.data.length;i++)
        {
            obj.data.push({"id":i});
            obj.data[i].departmentName = myFactory1.data[i].department;
            obj.data[i].location = myFactory1.data[i].location;
            obj.data[i].employee = myFactory2.data[i].empName;
            obj.data[i].task = myFactory3.data[i].task;
            obj.data[i].time = myFactory3.data[i].deadline;
        }
        function ids() {
            return id++;
        }
        return obj;
    }])

    .controller('View4Ctrl', [ '$scope','myFactory4', function($scope,myFactory4) {
        $scope.infos = myFactory4.data;

        $scope.showTask = function (index) {
            $scope.worker = $scope.infos[index].employee;
            $scope.workPlace = $scope.infos[index].departmentName;
            $scope.work = $scope.infos[index].task;
            $scope.endDate = $scope.infos[index].time;
    };
        
        $scope.showDep = function (index) {
            $scope.worker = $scope.infos[index].employee;
            $scope.workPlace = $scope.infos[index].location;
            $scope.work = $scope.infos[index].departmentName;
    };
        
        $scope.showEmp = function (index) {
            $scope.worker = $scope.infos[index].employee;
            $scope.workPlace = $scope.infos[index].departmentName;
    };
    }]);