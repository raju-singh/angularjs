/*global angular*/
angular.module('myApp').factory('mvCourse', function($resource) {
  var CourseList = $resource('/api/courses/:id', { id: "@_id" }, {
    'index': {method:'GET', isArray: true},
    'show':{method: 'GET', isArray: false},
    'create':{method: 'POST'},
    'update' :{method : 'PUT'},
    'delete' : {method : 'DELETE'}
  });

  return CourseList;
});