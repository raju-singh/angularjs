/*global angular*/

/*global id*/
var app = angular.module('myApp');

    app.controller('coursePager', function($scope, $http){
         $scope.curPage = 0;
        $scope.pageSize = 7;
        $scope.lodaing = false;
        $scope.getCourse = function(){
            $scope.loading = true;
            $scope.courses = [];
            var itemsPerPage = $scope.itemsPerPage;
            var pageno = $scope.pageNumber;
            
            $http.get("/api/courses").success(function(response){
                   $scope.courses = response;
                   console.log(response);
                });
        };
        $scope.numberOfPages = function(){
            return Math.ceil($scope.courses.length / $scope.pageSize);
        };
        $scope.getCourse();
       
    })
    .filter('pagination', function(){
        return function(input, start){
            start = +start;
            return input.slice(start);
        };
    });