'use strict';

angular.module('myApp.Service', [])

    .service('Service',['$http',function ($http) {
        this.getAPIinfo = function (link) {
            return $http.get(link);
        }

    }]);