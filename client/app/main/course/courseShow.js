/*global angular*/
angular.module('myApp')
    .controller('showCourse',  function($scope, $routeParams, mvCourse){
         $scope.course = mvCourse.show({ id: $routeParams.id });
    });