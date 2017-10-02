'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .factory('myFactory1',['myFactory2',function departments (myFactory2){
        var obj = {};
        var id = 0;

        /*var result = JSON.parse(localStorage.getItem("departments"));



        if(result!=null)
        {
            obj.data = JSON.parse(localStorage.getItem("departments"));
            console.log('IF SUCCEEDED');
        }
        else
        {*/
            obj.data = [
                { "department":"IT",            "location":"Ohio",       "depId":ids() },
                { "department":"HRM",           "location":"Indiana",    "depId":ids() },
                { "department":"Accounting",    "location":"Washington", "depId":ids() },
                { "department":"Marketing",     "location":"New York",   "depId":ids() },
                { "department":"Legal Affairs", "location":"California", "depId":ids() }];
        var j =-1;
        function newProp () {
            j++;
            return myFactory2.data[j].empName;
        }
        var i;
        for (i=0;i<obj.data.length;i++)
        {
            obj.data[i].emp = newProp();
        }

        function ids() {
            return id++;
        }
            /*var temp = obj.data;

            localStorage.setItem("departments",JSON.stringify(temp));
            console.log("if didnt succeed");

        }*/

        return obj;
    }])

    /*.directive('myDirective1',function () {
        return{
            template:
            "<tr>"
            '<td> {{ $index+1 }}.</td>'
        '<td> {{department.department}} </td>'
        <td> {{department.emp}}</td>
        <td>{{department.location}}</td>
        <td> <button class="btn btn-info btn-sm"  type="button" data-toggle="modal" data-target="#myModalEdit" ng-click="selectDepartment(department)">Edit</button>
            <button class="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#myModalDelete" data-dismiss="modal" ng-click="deleteDepartment(selectDepartment(department))">Delete</button> </td>
        </tr>
        }
    })*/

    .controller('View1Ctrl', [ '$scope','myFactory1', function($scope, myFactory1) {
        var data = myFactory1.data;
        $scope.departments = data;
        console.log("in controller...");
        $scope.newDepartment = {};
        $scope.info = "";

        $scope.saveDepartment = function(){
            if ($scope.newDepartment.emp !== undefined && $scope.newDepartment.department!== undefined && $scope.newDepartment.location!==undefined) {
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