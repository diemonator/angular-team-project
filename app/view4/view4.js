'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])


 .factory('View4Factory',['myFactory1','myFactory2','myFactory3', function dashboard (myFactory1,myFactory2,myFactory3)
    {
        var j = -1;
        var t = -1;
        var h = -1;

        var returnedData = {};
        returnedData.data = [];
        function newProp () {
            j++;
            return myFactory1.data[j];
        }
        function newPropEmp () {
            t++;
            return myFactory2.data[t];
        }
        function newPropTask () {
            h++;
            return myFactory3.data[h];
        }
        for (var i=0;i<myFactory1.data.length;i++)
        {
            returnedData.data.push({"id":i});
            returnedData.data[i].department = newProp();
            returnedData.data[i].employee = newPropEmp();
            returnedData.data[i].task = newPropTask();
        }
        return returnedData;
    }])
.controller('View4Ctrl', [ '$scope','View4Factory', function($scope,View4Factory) {
    $scope.infos = View4Factory.data;

    $scope.employeeShow = function (index) {
        window.alert("You clicked "+$scope.infos[index].employee.name+" from department: "+$scope.infos[index].employee.department);
    }
    $scope.departmentShow = function (index) {
        window.alert("You clicked on Department "+$scope.infos[index].department.department+". It is in "+$scope.infos[index].department.location);
    }
    $scope.taskShow = function (index) {
        window.alert("You clicked on task: "+$scope.infos[index].task.task+". It is for: "+$scope.infos[index].task.emp+" and is due by "+$scope.infos[index].task.deadline);
    }
}]);