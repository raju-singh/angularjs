/*global angular*/
angular.module('myApp')
    .controller('courseCtrl', function($scope, mvCourse){
        $scope.courses = mvCourse.query();
        $scope.save = function(){
            if($scope.name != '') return;
            
            var course = new mvCourse({ name: $scope.name, published :$scope.published, completed: false, language: $scope.language});
        
                course.$save(function(){
                  $scope.courses.push(course)
                  $scope.name = '';
                  $scope.published = '';
                  $scope.language = '';
                });
                
            if(course.$save){
                alert('FIne');
            }
            else{
                alert('Failure');
            }
        };
    });