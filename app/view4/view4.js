'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .service('WeatherService',['$http',function ($http) {
        this.getWeather = function () {
            return $http.get('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=8ee783ade6c68579678b8e2ca073d450');
        }


    }])
    .factory('myFactory4',['Service' , function (Service)
    {

            var obj = [];
            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/departments')
                .then(function (response) {
                    obj.dep = response.data;
                }, function (error) {
                    $scope.error = error;
                });

            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/employees')
                .then(function (response) {
                    obj.emp = response.data;
                }, function (error) {
                    $scope.error = error;
                });

            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/tasks')
                .then(function (response) {
                    obj.tsk = response.data;
                }, function (error) {
                    $scope.error = error;
                });

            return obj;
    }])

    .controller('View4Ctrl',['$scope','myFactory4','WeatherService','Service',function($scope,myFactory4,WeatherService, Service) {

        WeatherService.getWeather()
            .then(function (response) {
                $scope.weather = response.data;
                console.log($scope.weather)
            },function (error) {
                $scope.error = error;
            });
        Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/departments')
            .then(function (response) {
                $scope.department = response.data;

            }, function (error) {
                $scope.error = error;
            });

        Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/employees')
            .then(function (response) {
                $scope.employee = response.data;
            }, function (error) {
                $scope.error = error;
            });

        Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/tasks')
            .then(function (response) {
                $scope.task = response.data;
            }, function (error) {
                $scope.error = error;
            });



        $scope.showTask = function (index) {

            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/tasks/'+index)
                .then(function (response) {
                    $scope.taskResult = response.data;
                    console.log($scope.taskResult);
                }, function (error) {
                    $scope.error = error;
                });

        };

        $scope.showDepartment = function (index) {

            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/departments/'+index)
                .then(function (response) {
                    $scope.departmentResult = response.data;
                    console.log($scope.departmentResult);
                }, function (error) {
                    $scope.error = error;
                });

        };

        $scope.showEmployee = function (index) {

            Service.getAPIinfo('http://i874156.iris.fhict.nl/WEB2/employees/'+index)
                .then(function (response) {
                    $scope.employeeResult = response.data;
                    console.log($scope.employeeResult);
                }, function (error) {
                    $scope.error = error;
                });

        };


    }])
    .directive('myDirective',function () {
        return {
            template: '<table class="table table-striped">\
            <thead>\
            <tr>\
            <th>No</th>\
            <th>DeptNo</th>\
            <th>Title</th>\
            <th>Description</th>\
            <th>Finished Date</th>\
            <th>Modification Date</th>\
            <th>creatioDate</th>\
            <th>Employees</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr>\
            <td>{{taskResult.no}} </td>\
            <td>{{taskResult.deptNo}}</td>\
            <td>{{taskResult.title}}</td>\
            <td>{{taskResult.description}}</td>\
            <td>{{taskResult.finishedDate}}</td>\
            <td>{{taskResult.modificationDate}}</td>\
            <td>{{taskResult.creatioDate}}</td>\
            <td>\
            <ul>\
            <li ng-repeat="e in taskResult.employees">{{e.no}} date {{e.assignedDate}}</li>\
            </ul>\
            </td>\
            </tr>\
            </tbody>\
            </table>'
        }
    })
    .directive('myDirective1',function () {
        return {
            template: '<table class="table table-striped">\
            <thead>\
            <tr>\
            <th>No</th>\
            <th>Code</th>\
            <th>Name</th>\
            <th>Employees</th>\
            <th>Tasks</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr>\
            <td>{{departmentResult.no}} </td>\
            <td>{{departmentResult.code}}</td>\
            <td>{{departmentResult.name}}</td>\
            <td>\
            <ul>\
            <li ng-repeat="emp in departmentResult.employees">{{emp.no}} from {{emp.fromDate}} to {{emp.toDate}}</li>\
            </ul>\
            </td>\
            <td>{{departmentResult.tasks}}</td>\
            </tr>\
            </tbody>\
            </table>'
        }
    })
    .directive('myDirective2',function () {
        return {
            template: '<table class="table table-striped">\
            <thead>\
            <tr>\
            <th>No</th>\
            <th>BirthDate</th>\
            <th>First Name</th>\
            <th>Last Name</th>\
            <th>Gender</th>\
            <th>Hire Date</th>\
            <th>Departments</th>\
            <th>Titles</th>\
            <th>Tasks</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr>\
            <td>{{employeeResult.no}} </td>\
            <td>{{employeeResult.birthDate}}</td>\
            <td>{{employeeResult.firstName}}</td>\
            <td>{{employeeResult.lastName}}</td>\
            <td>{{employeeResult.gender}}</td>\
            <td>{{employeeResult.hireDate}}</td>\
            <td>\
            <ul>\
            <li ng repeat="dep in employeeResult.departments">{{dep.no}} from {{dep.fromDate}} to {{dep.toDate}}</li>\
            </ul>\
            </td>\
            <td>\
            <ul>\
            <li ng repeat="title in employeeResult.titles">{{title.no}} from {{title.fromDate}} to {{title.toDate}} </li>\
            </ul>\
            </td>\
            <td>\
            <ul>\
            <li ng repeat="tsk in employeeResult.tasks">{{tsk.no}} from {{title.assignedDate}} </li>\
            </ul>\
            </td>\
            </tr>\
            </tbody>\
            </table>'
        }
    });