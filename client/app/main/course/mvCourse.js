/*global angular*/
angular.module('myApp').factory('mvCourse', function($resource) {
  var CourseList = $resource('/api/courses/:_id', null, {
    update: {method:'PUT'}
  });

  return CourseList;
});